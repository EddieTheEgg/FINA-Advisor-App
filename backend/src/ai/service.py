import logging
from typing import Annotated
import uuid
import re
from fastapi import Depends
from uuid import UUID
from sqlalchemy.orm import Session
from openai import OpenAI
from sqlalchemy.exc import SQLAlchemyError

from backend.src.exceptions import (
    DatabaseError,
    OpenAICallError, 
    OpenAIResponseError,
)
from backend.src.entities.category import Category
from backend.src.ai.model import (
    ApplySuggestionResponse,
    CategorySuggestionResponse,
    SuggestCategoryRequest
)

from backend.src.entities.category_suggestions import CategoryTraining


from backend.src.ai.config import client
from backend.src.transactions.model import TransactionType

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
    


# FastAPI dependency injection
def get_openai_service() -> OpenAI:
    return get_openai_client()

OpenAIServiceDep = Annotated[OpenAI, Depends(get_openai_service)]
