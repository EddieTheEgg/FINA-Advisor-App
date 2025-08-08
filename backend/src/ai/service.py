import logging
from typing import Annotated, List
import uuid
import re
from fastapi import Depends
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from openai import OpenAI
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime, timezone

from backend.src.exceptions import (
    DatabaseError,
    OpenAICallError, 
    OpenAIResponseError,
)
from backend.src.entities.category import Category
from backend.src.entities.transaction import Transaction
from backend.src.ai.model import (
    ApplySuggestionResponse,
    CategorySuggestionResponse,
    SuggestCategoryRequest,
    SmartSavingTipRequest,
    SmartSavingTipResponse,
    FinancialContext
)

from backend.src.entities.category_suggestions import CategoryTraining
from backend.src.insights.service import get_monthly_income, get_monthly_expense

from backend.src.ai.config import client
from backend.src.entities.enums import TransactionType, TipDifficulty

def get_openai_client() -> OpenAI:
    return client

# Suggest a category based on transaction details
async def suggest_category_from_details(
    db: Session,
    user_id: UUID,
    request: SuggestCategoryRequest,
) -> CategorySuggestionResponse:
    try:
        # Get all categories for the user
        categories = db.query(Category).filter(Category.user_id == user_id).all()
        
        if not categories:
            logging.warning(f"No categories found for user {user_id}")
            return CategorySuggestionResponse(
                suggestion_id = uuid.uuid4(),
                confidence=0.0,
                method="error",
                client_reference = request.client_reference
            )
        
        categories_list = []
        for category in categories:
            categories_list.append(f"- {category.category_id}: {category.category_name} ({'Income' if category.transaction_type == TransactionType.INCOME else 'Expense'})")
        categories_list = "\n".join(categories_list)
        
        prompt = f"""You are a financial transaction categorization assistant. Your task is to categorize a transaction into the most appropriate category from the provided list.

        AVAILABLE CATEGORIES:
        {categories_list}

        TRANSACTION DETAILS:
        Title: {request.title}
        Date: {request.transaction_date.strftime('%Y-%m-%d')}
        Amount: ${request.amount:.2f}
        Type: {"Income" if request.transaction_type == TransactionType.INCOME else "Expense"}
        Merchant: {request.merchant or 'Not specified'}
        Location: {request.location or 'Not specified'}
        Payment Method: {request.payment_type or 'Not specified'}
        Payment Account: {request.payment_account or 'Not specified'}
        Notes: {request.notes or 'None'}

        SUBSCRIPTION DETAILS:
        Is Subscription: {"Yes" if request.is_subscription else "No"}
        Frequency: {request.subscription_frequency or 'Not applicable'}
        Start Date: {request.subscription_start_date.strftime('%Y-%m-%d') if request.subscription_start_date else 'Not applicable'}
        End Date: {request.subscription_end_date.strftime('%Y-%m-%d') if request.subscription_end_date else 'Not applicable'}

        INSTRUCTIONS:
        1. Analyze the transaction details and find the best matching category from the list above.
        2. Only suggest a category if you are at least 80% confident in the match.
        3. If no category matches with 80% confidence, suggest a new category name.

        RESPONSE FORMAT:
        Category ID of the best match: <category_id or new_suggested_category_name>
        Confidence: <confidence_score between 0 and 1>

        Note: If suggesting a new category, do not include a category ID."""
        
        client = get_openai_client()
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "user", 
                "content": prompt
            }],
            temperature=0.3
        )
        
        content = response.choices[0].message.content.strip()
        
        # Parse the response using regex
        category_match = re.search(r'Category ID of the best match:\s*(.*?)(?:\n|$)', content, re.IGNORECASE)
        confidence_match = re.search(r'Confidence:\s*(\d*\.?\d+)', content, re.IGNORECASE)

        suggested_category_id = None
        suggested_category_name = None
        confidence_score = 0.0
        
        if category_match and confidence_match:
            category_id_str = category_match.group(1).strip()
            confidence_score = float(confidence_match.group(1))
            
            # Check if the category_id_str is a UUID
            uuid_valid = re.search(
                r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
                category_id_str,
                re.IGNORECASE
            )
            
            if uuid_valid:
                try:
                    predicted_category_uuid = UUID(uuid_valid.group(0))
                    for category in categories:
                        if category.category_id == predicted_category_uuid:
                           suggested_category_id = predicted_category_uuid
                except ValueError:
                    logging.warning(f"Category Id was a valid UUID but not found in the list of categories: {category_id_str}")
                    raise OpenAIResponseError()
            else:
                suggested_category_name = category_id_str

        if not category_match or not confidence_match:
            logging.warning(f"Couldn't extract category ID and confidence from OpenAI response: {content}")
            raise OpenAIResponseError()


        # Convert datetime to string for JSON serialization
        request_dict = request.model_dump()
        if 'transaction_date' in request_dict:
            request_dict['transaction_date'] = request_dict['transaction_date'].isoformat()
        if 'subscription_start_date' in request_dict and request_dict['subscription_start_date']:
            request_dict['subscription_start_date'] = request_dict['subscription_start_date'].isoformat()
        if 'subscription_end_date' in request_dict and request_dict['subscription_end_date']:
            request_dict['subscription_end_date'] = request_dict['subscription_end_date'].isoformat()

        suggestion = CategoryTraining(
            user_id = user_id,
            request_data = request_dict,
            suggested_category_id = suggested_category_id,
            suggested_category_name = suggested_category_name,
            confidence = confidence_score,
            client_reference = request.client_reference,
            model = "gpt-4o-mini",
        )

        db.add(suggestion)
        db.commit()
        db.refresh(suggestion)

        return CategorySuggestionResponse(
            suggestion_id=suggestion.suggestion_id,
            category_id=suggested_category_id,
            suggested_category_name=suggested_category_name,
            confidence=confidence_score,
            method="openai",
            client_reference=request.client_reference
        )
    except Exception as e:
        db.rollback()
        logging.error(f"Error calling OpenAI: {str(e)}")
        raise OpenAICallError()
    

# Apply a AI suggestion to a transaction and updates the suggestion to mark it as applied
# This should be called AFTER a transaction is created/updated,
# never before, since it requires a valid transaction_id.
async def apply_suggestion_to_transaction(
    db: Session,
    user_id: UUID,
    suggestion_id: UUID,
    transaction_id: UUID,
) -> ApplySuggestionResponse:
    try:
        # Get the suggestion from the database
        suggestion = db.query(CategoryTraining).filter(
            CategoryTraining.suggestion_id == suggestion_id, 
            CategoryTraining.user_id == user_id).first()
        
        if not suggestion:
            logging.warning(f"No suggestion found with ID: {suggestion_id}")
            return ApplySuggestionResponse(success=False, transaction_id=transaction_id, suggestion_id=suggestion_id)
        
        # Update the suggestion 
        suggestion.was_applied = True
        suggestion.transaction_id = transaction_id
        
        db.commit()
        db.refresh(suggestion)
        
        return ApplySuggestionResponse(
            success=True,
            transaction_id=transaction_id,
            suggestion_id=suggestion_id 
        )
    except SQLAlchemyError as e:
        db.rollback()
        logging.error(f"Database error applying suggestion: {str(e)}")
        raise DatabaseError(str(e))    
    except Exception as e:
        db.rollback()
        logging.error(f"Error applying suggestion to transaction: {str(e)}")
        raise OpenAICallError(str(e))
    














# AI Generate Insights

# Gather financial context for the smart saving tip generation (This is a helper method technically)
async def gather_financial_context(
    db: Session,
    user_id: UUID,
    month: int = None,
    year: int = None,
) -> FinancialContext:
    try:
        
        # Use current month/year if not provided, it is reached, this may be false positive display in VS
        if month is None or year is None:
            now = datetime.now(timezone.utc)
            month = now.month
            year = now.year
        
        # Get the first day of the month at midnight
        current_month_start = datetime(year, month, 1, tzinfo=timezone.utc)
        # Get the first day of next month
        current_month_end = current_month_start.replace(month=month+1 if month < 12 else 1, year=year if month < 12 else year+1)
        
        # Get monthly income and monthly expenses
        try:
            monthly_income = get_monthly_income(db, user_id, month, year)
            logging.info(f"Monthly income: {monthly_income} (type: {type(monthly_income)})")
        except Exception as e:
            logging.error(f"Error getting monthly income: {e}")
            monthly_income = 0.0
            
        try:
            monthly_expenses = get_monthly_expense(db, user_id, month, year)
            logging.info(f"Monthly expenses: {monthly_expenses} (type: {type(monthly_expenses)})")
        except Exception as e:
            logging.error(f"Error getting monthly expenses: {e}")
            monthly_expenses = 0.0
        
        # Calculate monthly savings
        monthly_savings = monthly_income - monthly_expenses
        
        # Percentage of income saved
        current_savings_rate = (monthly_savings / monthly_income * 100) if monthly_income > 0 else 0.0
        
        # Get top spending categories (5 max)
        top_categories_query = db.query(
            Category.category_name,
            func.sum(Transaction.amount).label('total_amount')
        ).join(Transaction, Category.category_id == Transaction.category_id).filter(
            Transaction.user_id == user_id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.transaction_date >= current_month_start,
            Transaction.transaction_date < current_month_end
        ).group_by(Category.category_id).order_by(
            func.sum(Transaction.amount).desc()
        ).limit(5)
        
        top_spending_categories = []
        for category_name, total_amount in top_categories_query.all():

            # Calculate percentage this category expense makes of the total expenses
            percentage = (total_amount / monthly_expenses * 100) if monthly_expenses > 0 else 0.0
            top_spending_categories.append({
                'category_name': category_name,
                'amount': float(total_amount),
                'percentage': float(percentage)
            })
        
        # Get recent transactions (max 10)
        recent_transactions_query = db.query(
            Transaction.notes,
            Transaction.title,
            Transaction.amount,
            Category.category_name,
            Transaction.location,
            Transaction.merchant,
            Transaction.is_subscription,
            Transaction.subscription_frequency,
            Transaction.subscription_start_date,
            Transaction.subscription_end_date
        ).join(Category, Transaction.category_id == Category.category_id).filter(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= current_month_start,
            Transaction.transaction_date < current_month_end
        ).order_by(Transaction.transaction_date.desc()).limit(10)
        
        recent_transactions = []
        for notes, title, amount, category_name, location, merchant, is_subscription, subscription_frequency, subscription_start_date, subscription_end_date in recent_transactions_query.all():
            recent_transactions.append({
                'notes': notes,
                'title': title,
                'amount': float(amount),
                'category': category_name,
                'location': location,
                'merchant': merchant,
                'is_subscription': is_subscription,
                'subscription_frequency': subscription_frequency.value if subscription_frequency else None,
                'subscription_start_date': subscription_start_date.isoformat() if subscription_start_date else None,
                'subscription_end_date': subscription_end_date.isoformat() if subscription_end_date else None
            })
        
        return FinancialContext(
            user_id=user_id,
            monthly_income=monthly_income,
            monthly_expenses=monthly_expenses,
            monthly_savings=monthly_savings,
            top_spending_categories=top_spending_categories,
            recent_transactions=recent_transactions,
            savings_goal=None,  # TODO: Add savings goal functionality (Part of budget implementation)
            current_savings_rate=current_savings_rate
        )
        
    except Exception as e:
        logging.error(f"Error gathering financial context: {str(e)}")
        raise DatabaseError(str(e))

async def generate_smart_saving_tip(
    db: Session,
    request: SmartSavingTipRequest,
) -> SmartSavingTipResponse:
    try:
        context = request.financial_context
        
        # If there's no transaciton context provided, return a dummy placeholder until user creates a transactions for this month (to prevent uneeded AI calls)
        if len(context.recent_transactions) <= 0:
            return SmartSavingTipResponse(
                tip_id= uuid.uuid4(),
                title = "No Transactions Found!",
                description= "There were no transactions found for this month! Please enter at least one transaction for this month.",
                potential_savings= 0,
                timeframe= "Unknown",
                category= None,
                difficulty= TipDifficulty.UNKNOWN,
                confidence= 1.0,
                client_reference=request.client_reference
            )
        
        # Create a comprehensive prompt for generating smart saving tips
        prompt = f"""You are a financial advisor AI assistant. Your task is to generate personalized smart saving tips based on the user's financial data.

        USER'S FINANCIAL CONTEXT:
        - Monthly Income: ${context.monthly_income:.2f}
        - Monthly Expenses: ${context.monthly_expenses:.2f}
        - Monthly Savings: ${context.monthly_savings:.2f}
        - Current Savings Rate: {context.current_savings_rate:.1f}%
        - Savings Goal: {f"${context.savings_goal:.2f}" if context.savings_goal is not None else 'Not set'}

        TOP SPENDING CATEGORIES:
        {_format_spending_categories(context.top_spending_categories)}

        RECENT TRANSACTIONS (last 10):
        {_format_recent_transactions(context.recent_transactions[:10])}

        INSTRUCTIONS:
        1. Analyze the user's spending patterns and financial situation
        2. Generate ONE specific, actionable saving tip that could realistically save money
        3. Focus on the highest spending categories or recurring expenses
        4. Make the tip personalized and specific to their situation
        5. Include a realistic potential savings amount and timeframe
        6. Consider their current savings rate and financial goals
        7. Keep the description SHORT and CONCISE - maximum 2-3 sentences for mobile display
        8. If you suggest/explain something, back it up with some example evidence you saw in your analysis.

        RESPONSE FORMAT:
        Respond with ONLY a valid JSON object in this exact format:
        {{
            "title": "short, catchy title (max 6 words)",
            "description": "brief, actionable tip in 2-3 sentences max",
            "potential_savings": 25.0,
            "timeframe": "per month",
            "category": "Food & Dining",
            "difficulty": "EASY",
            "confidence": 0.85
        }}

        IMPORTANT: The difficulty field must be exactly one of: "EASY", "MEDIUM", or "HARD" (not "Moderate" or any other value).

        Example:
        {{
            "title": "Brew Coffee at Home 3 Days Per Week",
            "description": "Consider brewing coffee at home 3 days per week to save money while maintaining your café routine. We noticed you go to the cafe regularly which could be a problem for your expenses. 
            Try brewing coffee at home, which could save you $25 monthly based on your current spending.",
            "potential_savings": 25.0,
            "timeframe": "per month",
            "category": "Food & Dining",
            "difficulty": "EASY",
            "confidence": 0.85
        }}

        Generate a tip that is specific, actionable, and personalized to this user's financial situation."""

        client = get_openai_client()
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "user", 
                "content": prompt
            }],
            temperature=0.7
        )
        
        content = response.choices[0].message.content.strip()
        
        # Parse the JSON response
        try:
            import json
            tip_data = json.loads(content)
            
            # Validate required fields
            required_fields = ['title', 'description', 'potential_savings', 'timeframe', 'difficulty', 'confidence']
            for field in required_fields:
                if field not in tip_data:
                    logging.warning(f"Missing required field '{field}' in OpenAI response: {content}")
                    raise OpenAIResponseError()
            
            return SmartSavingTipResponse(
                tip_id=uuid.uuid4(),
                title=tip_data['title'],
                description=tip_data['description'],
                potential_savings=float(tip_data['potential_savings']),
                timeframe=tip_data['timeframe'],
                category=tip_data.get('category'),  # Optional field
                difficulty=TipDifficulty(tip_data['difficulty']),
                confidence=float(tip_data['confidence']),
                client_reference=request.client_reference
            )
            
        except json.JSONDecodeError as e:
            logging.warning(f"Invalid JSON response from OpenAI: {content}")
            raise OpenAIResponseError()
        except (ValueError, KeyError) as e:
            logging.warning(f"Error parsing OpenAI response: {str(e)}")
            raise OpenAIResponseError()
        
    except Exception as e:
        logging.error(f"Error generating smart saving tip: {str(e)}")
        raise OpenAICallError()

# Format spending categorys for the GPT prompt
def _format_spending_categories(categories: List[dict]) -> str:
    formatted_categories = []
    for category in categories:
        category_name = category['category_name']
        amount = category['amount']
        percentage = category['percentage']
        formatted_categories.append(
            f"- {category_name}: ${amount:.2f} ({percentage:.1f}% of expenses)"
        )
    return '\n'.join(formatted_categories)

# Format recent transactions for the GPT prompt
def _format_recent_transactions(transactions: List[dict]) -> str:
    formatted_transactions = []
    for transaction in transactions:
        title = transaction['title']
        amount = transaction['amount']
        category = transaction['category']
        location = transaction.get('location', 'N/A')
        merchant = transaction.get('merchant', 'N/A')
        is_subscription = transaction.get('is_subscription', False)
        subscription_frequency = transaction.get('subscription_frequency', 'N/A')
        
        # Build the transaction description
        transaction_desc = f"- {title}: ${amount:.2f} ({category})"
        
        # Add location if available
        if location and location != 'N/A':
            transaction_desc += f" | Location: {location}"
        
        # Add merchant if available
        if merchant and merchant != 'N/A':
            transaction_desc += f" | Merchant: {merchant}"
        
        # Add subscription info if it's a subscription
        if is_subscription:
            transaction_desc += f" | Subscription: {subscription_frequency}"
        
        formatted_transactions.append(transaction_desc)
    
    return '\n'.join(formatted_transactions)


# FastAPI dependency injection
def get_openai_service() -> OpenAI:
    return get_openai_client()

OpenAIServiceDep = Annotated[OpenAI, Depends(get_openai_service)]
