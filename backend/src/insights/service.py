from datetime import datetime
import logging
from sqlalchemy import func
from sqlalchemy.orm import Session
from uuid import UUID

from backend.src.entities.enums import TransactionType
from backend.src.entities.transaction import Transaction
from backend.src.exceptions import MonthlyExpenseFetchError, MonthlyIncomeFetchError
from backend.src.insights.model import MonthlyFinancialHealthResponse

def get_monthly_health(db: Session, user_id: UUID, month: int, year: int):
    current_month = datetime.now().month
    current_year = datetime.now().year
    
    monthly_income = get_monthly_income(db, user_id, current_month, current_year);
    monthly_expense = get_monthly_expense(db, user_id, current_month, current_year);
    net_saved = monthly_income - monthly_expense;
    
    if net_saved > 0:
        status = "Positive"
        icon = "💰"
        analysis_detail = "You're on track!"
    elif net_saved < 0:
        status = "Negative"
        icon = "💸"
        analysis_detail = "Focus on reducing expenses, you're spending more than you earn!"
    else:
        status = "Neutral"
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