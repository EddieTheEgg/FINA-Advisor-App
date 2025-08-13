from datetime import timedelta, date
from dateutil.relativedelta import relativedelta
from sqlalchemy import func
import logging
from backend.src.budgets.model import BudgetCategoryResponse, BudgetCategoryListResponse, BudgetCreateRequest, BudgetListResponse, BudgetResponse
from sqlalchemy.orm import Session
from uuid import UUID

from backend.src.categories.model import CategoryResponse
from backend.src.entities.category import Category
from backend.src.entities.budgets import Budget
from backend.src.entities.enums import TransactionType
from backend.src.entities.transaction import Transaction
from backend.src.exceptions import BudgetAlreadyExistsError, BudgetCategoryFetchError, BudgetCreationError, BudgetFetchError, BudgetSpentFetchError
from backend.src.categories import service as category_service

def create_budget(
    db: Session,
    user_id: UUID,
    budget_request: BudgetCreateRequest
) -> None:
    
    try : 
        #Check if budget already exists for this category and month
        existing_budget = db.query(Budget).filter(
            Budget.user_id == user_id,
            Budget.category_id == UUID(budget_request.category_id),
            Budget.budget_month == budget_request.budget_month
        ).first()
        
        if existing_budget:
            logging.warning(f"Budget already exists for category {budget_request.category_id} in month {budget_request.budget_month}")
            raise BudgetAlreadyExistsError(f"Budget already exists for this given category {budget_request.category_id} in month {budget_request.budget_month}, do you want to update it instead?")
        
        budget_data = Budget(
            user_id = user_id,
            category_id = UUID(budget_request.category_id),
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
        
    except Exception as e:
        logging.error(f"Error creating budget: {e}")
        raise BudgetCreationError(f"Error creating budget: {e}")
    
    
# Returns the amount spent on a given category for a given user in a given month
def get_budget_spent(
    db: Session,
    budget_category_id: UUID,
    user_id: UUID,
    budget_month: date
) -> float:
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
    
    
# Fetches all categories that don't have budgets for the specified month
def get_unbudgeted_categories_service(
    db: Session,
    user_id: UUID,
    month_date: date,
    skip: int,
    limit: int,
) -> BudgetCategoryListResponse:
    try : 
        # Join budget table to main category table
        available_categories = db.query(Category).outerjoin(
            #Outerjoin is used to get all categories and match them with budgets, and returns all categories even if some don't have budgets
            Budget,
            (Category.category_id == Budget.category_id) &
            (Budget.user_id == user_id) & 
            (Budget.budget_month == month_date)
            #Filter out the categories above (that has matched and unmatched categories/budgets to only those with no budgets)
        ).filter(
            Category.user_id == user_id,
            Category.transaction_type == TransactionType.EXPENSE,
            Budget.category_id.is_(None)
        ).offset(skip).limit(limit).all()
        
        # Get total count for pagination
        total_categories = db.query(Category).outerjoin(
            Budget,
            (Category.category_id == Budget.category_id) &
            (Budget.user_id == user_id) & 
            (Budget.budget_month == month_date)
        ).filter(
            Category.user_id == user_id,
            Category.transaction_type == TransactionType.EXPENSE,
            Budget.category_id.is_(None)
        ).count()

        # Convert to response models
        category_responses = []
        for category in available_categories:
            category_data = BudgetCategoryResponse(
                category_id=category.category_id,
                category_name=category.category_name,
                category_description=category.category_description,
                category_icon=category.icon,
                category_color=category.color,
            )
            category_responses.append(category_data)

        return BudgetCategoryListResponse(
            categories=category_responses,
            has_next=skip + limit < total_categories,
            current_page=skip // limit + 1,
            page_size=limit
        )

    except Exception as e:
        logging.error(f"Error getting unbudgeted categories: {e}")
        raise BudgetCategoryFetchError(f"Error getting unbudgeted categories: {e}")


def get_budgets_service(
    db: Session,
    user_id: UUID,
    month_date: date,
    skip: int,
    limit: int,
) -> BudgetListResponse:
    try :
        # Get the base query
        base_query = db.query(Budget).filter(
            Budget.user_id == user_id,
            Budget.budget_month == month_date
        )
        
        # Get paginated results and total count in one query
        budgets = base_query.offset(skip).limit(limit).all()
        total_budget_count = base_query.count()
        
        budget_responses = []
        for budget in budgets:
            # Get category data for each budget
            category_data = category_service.get_category_by_id(db, budget.category_id, user_id)
            formatted_category_data = BudgetCategoryResponse(
                category_id=category_data.category_id,
                category_name=category_data.category_name,
                category_description=category_data.category_description,
                category_icon=category_data.icon,
                category_color=category_data.color,
            )
            if not category_data:
                logging.warning(f"Category not found for budget {budget.budget_id}")
                continue
                
            budget_data = BudgetResponse(
                budget_id=budget.budget_id,
                category_data=formatted_category_data,
                budget_spent=get_budget_spent(db, budget.category_id, user_id, budget.budget_month),
                budget_amount=budget.budget_amount,
                budget_month=budget.budget_month
            )
            budget_responses.append(budget_data)
        
        return BudgetListResponse(
            budgets=budget_responses,
            has_next = (skip + limit) < total_budget_count,
            current_page = skip // limit + 1,
            page_size = limit
        )
    
    except Exception as e:
        logging.error(f"Error getting budgets: {e}")
        raise BudgetFetchError(f"Error getting budgets: {e}")