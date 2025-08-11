from datetime import timedelta, date
from dateutil.relativedelta import relativedelta
from sqlalchemy import func
import logging
from backend.src.budgets.model import BudgetCreateRequest, BudgetResponse
from sqlalchemy.orm import Session
from uuid import UUID

from backend.src.entities.category import Category
from backend.src.entities.budgets import Budget
from backend.src.entities.transaction import Transaction
from backend.src.exceptions import BudgetAlreadyExistsError, BudgetCategoryFetchError, BudgetCreationError, BudgetSpentFetchError
from backend.src.categories import service as category_service

def create_budget(
    db: Session,
    user_id: UUID,
    budget_request: BudgetCreateRequest
) -> BudgetResponse:
    
    try : 
        #Check if budget already exists for this category and month
        existing_budget = db.query(Budget).filter(
            Budget.user_id == user_id,
            Budget.category_id == UUID(budget_request.category_id),
            Budget.budget_month == budget_request.budget_month
        ).first()
        
        if existing_budget:
            logging.warning(f"Budget already exists for category {budget_request.category_id} in month {budget_request.budget_month}")
            raise BudgetAlreadyExistsError(f"Budget already exists for category {budget_request.category_id} in month {budget_request.budget_month}, do you want to update instead?")
        
        budget_data = Budget(
            user_id = user_id,
            category_id = UUID(budget_request.category_id),
            budget_name = budget_request.budget_name,
            budget_amount = budget_request.budget_amount,
            budget_month = budget_request.budget_month,
        )
        
        db.add(budget_data)
        db.commit()
        db.refresh(budget_data)
        
        #Gets the category data with a CategoryResponse
        category_data = category_service.get_category_by_id(db, budget_data.category_id, user_id)
        
        if not category_data:
            logging.error(f"Category with id {budget_data.category_id} not found")
            raise BudgetCategoryFetchError(f"Category with id {budget_data.category_id} for this budget not found")
        
        return BudgetResponse(
            budget_id = budget_data.budget_id,
            category_data = category_data,
            budget_name = budget_data.budget_name,
            budget_spent = get_budget_spent(db, budget_data.category_id, user_id, budget_data.budget_month),
            budget_amount = budget_data.budget_amount,
            budget_month = budget_data.budget_month,
        )
        
    except Exception as e:
        logging.error(f"Error creating budget: {e}")
        raise BudgetCreationError(f"Error creating budget: {e}")
    
    
def get_budget_spent(
    db: Session,
    budget_category_id: UUID,
    user_id: UUID,
    budget_month: date
) -> float:
    """
    Returns the amount spent on a given category for a given user in a given month
    """
    try : 
        end_of_month = budget_month + relativedelta(months=1) - timedelta(days=1)
        
        budget_spent = db.query(func.sum(Transaction.amount)).filter(
            Transaction.category_id == budget_category_id, 
            Transaction.user_id == user_id,
            Transaction.transaction_date.between(budget_month, end_of_month)
        ).scalar()
        return budget_spent if budget_spent else 0
    except Exception as e:
        logging.error(f"Error getting budget spent: {e}")
        raise BudgetSpentFetchError(f"Error getting budget spent: {e}")