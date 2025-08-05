from datetime import datetime
import logging
from sqlalchemy import Float, func
from sqlalchemy.orm import Session
from uuid import UUID

from backend.src.entities.enums import KeyInsightsStatus, SavingsStatus, TransactionType
from backend.src.entities.transaction import Transaction
from backend.src.entities.category import Category
from backend.src.exceptions import KeyInsightsFetchError, MonthlyExpenseFetchError, MonthlyIncomeFetchError, MonthlySpendingTrendFetchError
from backend.src.insights.model import KeyInsightsResponse, MonthlyFinancialHealthResponse, MonthlySavingsRateResponse, MonthlySpendingTrend, TopSpendingCategoryResponse

def get_monthly_health(db: Session, user_id: UUID, month: int, year: int):
    
    monthly_income = get_monthly_income(db, user_id, month, year);
    monthly_expense = get_monthly_expense(db, user_id, month, year);
    net_saved = monthly_income - monthly_expense;
    
    if net_saved > 0:
        status = KeyInsightsStatus.POSITIVE
        icon = "💰"
        analysis_detail = "You are financially healthy, great job!"
    elif net_saved < 0:
        status = KeyInsightsStatus.NEGATIVE
        icon = "💸"
        analysis_detail = "Focus on reducing expenses, you're spending more than you earn!"
    else:
        status = KeyInsightsStatus.WARNING
        icon = "💰"
        analysis_detail = "You're breaking even, consider building a small buffer!"
    
    
    return MonthlyFinancialHealthResponse(
        analysis_detail = analysis_detail,
        icon = icon,
        status = status,
        income = monthly_income,
        expense = monthly_expense,
        net_saved = net_saved
    )
    
    
def get_monthly_savings(db: Session, user_id: UUID, month: int, year: int):
    monthly_income = get_monthly_income(db, user_id, month, year);
    monthly_expense = get_monthly_expense(db, user_id, month, year);
    net_saved = monthly_income - monthly_expense;
    
    percentage_savings = (net_saved / monthly_income) * 100 if monthly_income > 0 else 0;
    
    if percentage_savings > 0:
        status = KeyInsightsStatus.POSITIVE
        icon = "💰"
        savings_analysis = "That's well above the recommended 20% • Keep up the excellent work!"
    else:
        status = KeyInsightsStatus.WARNING
        icon = "💰"
        savings_analysis = "You're not saving anything! • Try to allocate some of your income to savings."
    
    return MonthlySavingsRateResponse(
        status = status,
        savings_analysis = savings_analysis,
        icon = icon,
        percentage_savings = percentage_savings
    )
    
    
# Returns the category (CategoryResponse) with the highest amount spent on a transaction in a given month
def get_top_spending_category(db: Session, user_id: UUID, month: int, year: int):
    # First, create a table that has the category_id and the total amount spent on that category
    # Then, order the table by the total amount spent on that category in descending order
    # Then, limit the table to the top 1 row
    try:
        top_spending_category_query = db.query(
            Category,
            func.sum(Transaction.amount).label("total_spent")
        #Transaction filtering: Only join transactions from the transaction table 
        # that have the same category_id assigned as this group category
        ).join(Transaction, Category.category_id == Transaction.category_id 
        # For those tranasctions with same category_id assigned, filter even further
        ).filter(
            Transaction.user_id == user_id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.transaction_date.month == month,
            Transaction.transaction_date.year == year
        #Then group these transactions by category_id so that each category has like their "list" of transactions 
        ).group_by(Category.category_id
        # Order the table by the calculating the sum of the transaction amounts in each category group
        ).order_by(func.sum(Transaction.amount).desc()
        ).limit(1).first()
        
        if not top_spending_category_query:
            return None
        
        # Get total expenses for the month to calculate percentage
        total_expenses = get_monthly_expense(db, user_id, month, year)
        
        category = top_spending_category_query[0]
        total_spent = top_spending_category_query[1]
        percentage_spent = (total_spent / total_expenses * 100) if total_expenses > 0 else 0
        
        return TopSpendingCategoryResponse(
            category = category,
            total_spent = total_spent,
            percentage_spent = percentage_spent
        )
    except Exception as e:
        logging.error(f"Error getting top spending category: {e}")
        return None
    
    
def get_monthly_spending_trend(db: Session, user_id: UUID, month: int, year: int):
    try:
        previous_month = month - 1 if month > 1 else 12
        previous_year = year if previous_month != 12 else year - 1
        
        current_month_spending = get_monthly_expense(db, user_id, month, year)
        previous_month_spending = get_monthly_expense(db, user_id, previous_month, previous_year)
        spending_trend_percentage = ((current_month_spending - previous_month_spending) / previous_month_spending) * 100 if previous_month_spending > 0 else 0 
        
        if spending_trend_percentage > 0:
            status = KeyInsightsStatus.NEGATIVE
        elif spending_trend_percentage < 0:
            status = KeyInsightsStatus.POSITIVE
        else:
            status = KeyInsightsStatus.NEUTRAL
            
        return MonthlySpendingTrend(
            status = status,
            current_month_spending = current_month_spending,
            previous_month_spending = previous_month_spending,
            spending_trend_percentage = spending_trend_percentage,
            icon = "📊"
        )
    except Exception as e:
        logging.error(f"Error getting monthly spending trend: {e}")
        raise MonthlySpendingTrendFetchError(f"Error getting monthly spending trend: {e}")

def get_monthly_income(db: Session, user_id: UUID, month: int, year: int):
    try:
        sum_income_query = db.query(func.sum(Transaction.amount)).filter(
            Transaction.user_id == user_id,
            Transaction.transaction_type == TransactionType.INCOME,
            Transaction.transaction_date.month == month,
            Transaction.transaction_date.year == year
        )
        return sum_income_query.scalar() or 0.0
    except Exception as e:
        logging.error(f"Error getting monthly income: {e}")
        raise MonthlyIncomeFetchError(f"Error getting monthly income: {e}")

def get_monthly_expense(db: Session, user_id: UUID, month: int, year: int):
    try:
        sum_expense_query = db.query(func.sum(Transaction.amount)).filter(
        Transaction.user_id == user_id,
        Transaction.transaction_type == TransactionType.EXPENSE,
        Transaction.transaction_date.month == month,
            Transaction.transaction_date.year == year
        )
        return sum_expense_query.scalar() or 0.0
    except Exception as e:
        logging.error(f"Error getting monthly expense: {e}")
        raise MonthlyExpenseFetchError(f"Error getting monthly expense: {e}")





# Returns main key insights for the current month, some cards may not exist if the user has insuffiicent data
def get_key_insights(db: Session, user_id: UUID):
    try:
        current_month = datetime.now().month
        current_year = datetime.now().year
        
        monthly_financial_health = get_monthly_health(db, user_id, current_month, current_year)
        monthly_savings_rate = get_monthly_savings(db, user_id, current_month, current_year)
        top_spending_category = get_top_spending_category(db, user_id, current_month, current_year)
        monthly_spending_trend = get_monthly_spending_trend(db, user_id, current_month, current_year)
        
        return KeyInsightsResponse(
            monthly_financial_health = monthly_financial_health,
            monthly_savings_rate = monthly_savings_rate,
            monthly_top_spending_category = top_spending_category,
            monthly_spending_trend = monthly_spending_trend
        )
        
    except Exception as e:
        logging.error(f"Error getting key insights: {e}")
        raise KeyInsightsFetchError(f"Error getting key insights: {e}")