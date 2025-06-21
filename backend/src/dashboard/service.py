from datetime import timezone, datetime
from datetime import timedelta
from typing import List
from uuid import UUID
from sqlalchemy import case, func
from sqlalchemy.orm import Session
import logging

from backend.src.dashboard.model import AccountBalance, AccountsResponse, DashboardResponse, FinancialSummary, RecentTransaction
from backend.src.entities.transaction import Transaction
from backend.src.exceptions import DashboardInvalidMonthYearError, MonthlyExpenseError, MonthlyIncomeError, MonthlyTransferError, RecentTransactionsError, TotalBalanceError
from backend.src.transactions.model import TransactionType
from backend.src.users.service import get_quick_user_by_id
from backend.src.accounts import service as account_service
from backend.src.categories import service as category_service
from backend.src.entities.account import Account  # Make sure to import Account

# Main Service function to getting all dashboard
def get_dashboard(
    db: Session,
    user_id: UUID,
    month: int,
    year: int,
) -> DashboardResponse:
    # Get the first day of the month at midnight
    current_month_start = datetime(year, month, 1, tzinfo=timezone.utc)
    # Get the first day of next month
    current_month_end = current_month_start.replace(month=month+1 if month < 12 else 1, year=year if month < 12 else year+1)

    user = get_quick_user_by_id(db, user_id)
    period = {"month": convert_month_to_string(month), "year": year}
    financial_summary = get_financial_summary(db, user_id, user.created_at, current_month_start, current_month_end)
    accounts_response = get_account_information(db, user_id)
    recent_transactions = get_recent_transactions(db, user_id, user.created_at, datetime.now(timezone.utc))

    return DashboardResponse(
        user=user,
        period=period,
        financialSummary=financial_summary,
        accounts=accounts_response,
        recentTransactions=recent_transactions
    )
    
# Converts numeric month value to actual string for frontend
# Helper function for get_dashboard
def convert_month_to_string(month: int):
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[month - 1]
    
#Get the financial summary for the user for the specific month and year
#Helper function for get_dashboard
def get_financial_summary(
    db: Session,
    user_id: UUID,
    account_created_at: datetime,
    start_date: datetime,
    end_date: datetime,
) -> FinancialSummary:
    # Simple query to sum account balances where include_in_totals = True
    total_balance_query = db.query(func.sum(Account.balance)).filter(
        Account.user_id == user_id,
        Account.include_in_totals == True
    )
    total_balance = float(total_balance_query.scalar() or 0.0)
            
    #Get the monthly income for the user for the specific month and year
    try:
        monthly_income_query = db.query(func.sum(
            case((Transaction.transaction_type == TransactionType.INCOME, Transaction.amount), else_=0)
        ).label('monthly_income')).filter(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= start_date,
            Transaction.transaction_date < end_date
        )  
        monthly_income = float(monthly_income_query.scalar() or 0.0)
    except Exception as e:
        logging.warning(f"Failed to get monthly income for user {user_id}. Error: {str(e)}")
        raise MonthlyIncomeError(user_id, start_date.month, start_date.year)
    
    #Get the monthly expense for the user for the specific month and year
    try:
        monthly_expense_query = db.query(func.sum(
            case((Transaction.transaction_type == TransactionType.EXPENSE, Transaction.amount), else_=0)
        ).label('monthly_expense')).filter(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= start_date,
            Transaction.transaction_date < end_date
        )
        monthly_expense = float(monthly_expense_query.scalar() or 0.0)
    except Exception as e:
        logging.warning(f"Failed to get monthly expense for user {user_id}. Error: {str(e)}")
        raise MonthlyExpenseError(user_id, start_date.month, start_date.year)
    
    try:
        monthly_transfer_query = db.query(func.sum(
            case((Transaction.transaction_type == TransactionType.TRANSFER, Transaction.amount), else_=0)
        ).label('monthly_transfer')).filter(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= start_date,
            Transaction.transaction_date < end_date
        )
        monthly_transfer = float(monthly_transfer_query.scalar() or 0.0)
    except Exception as e:
        logging.warning(f"Failed to get monthly transfer for user {user_id}. Error: {str(e)}")
        raise MonthlyTransferError(user_id, start_date.month, start_date.year)
    
    #Get the monthly net for the user for the specific month and year
    # DOES NOT INCLUDE TRANSFER TRANSACTIONS
    monthly_net = monthly_income - monthly_expense
    
    #Determine if the monthly net is positive or negative
    isPositive = True if monthly_net >= 0 else False
        
    return FinancialSummary(
        total_balance=total_balance,
        monthly_income=monthly_income,
        monthly_expense=monthly_expense,
        monthly_transfer=monthly_transfer,
        monthlyNet=monthly_net,
        isPositive=isPositive
    )
    

# Get all account basic information that's associated with the given user id
def get_account_information(
    db: Session,
    user_id: UUID,
) -> List[AccountBalance]:
    account_list =  account_service.get_all_account_information(db, user_id)
    number_of_accounts = len(account_list)
    
    return AccountsResponse(
        count = number_of_accounts,
        accounts = account_list,
    )
    
#Get the recent (5) transactions for the user for the specific month and year
def get_recent_transactions(
    db: Session,
    user_id : UUID,
    start_date: datetime,
    end_date: datetime,
) -> List[RecentTransaction]:
    
    try:
        transactions = db.query(Transaction).filter(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= start_date,
            Transaction.transaction_date < end_date,
        ).order_by(Transaction.transaction_date.desc()).limit(5).all()
        
       
        recent_transactions = []
        for transaction in transactions:
            category_response = category_service.get_category_by_id(db, transaction.category_id, user_id)
            account_name = account_service.get_account_name_by_id(db, transaction.account_id, user_id)
            to_account_name = None
            if transaction.to_account_id:
                to_account_name = account_service.get_account_name_by_id(db, transaction.to_account_id, user_id)
            recent_transactions.append(RecentTransaction(
                transaction_id=transaction.transaction_id,
                amount=transaction.amount,
                title=transaction.title,
                transaction_date=transaction.transaction_date,
                transaction_type=transaction.transaction_type,
                category= category_response,
                merchant=transaction.merchant,
                account_name = account_name,
                to_account_name = to_account_name,
                notes=transaction.notes,
                is_subscription = transaction.is_subscription,
            ))
        return recent_transactions
    except Exception as e:
        logging.warning(f"Failed to get recent transactions for user {user_id}. Error: {str(e)}")
        raise RecentTransactionsError(user_id, start_date.month, start_date.year)
    
    
    
    
    

    
    
