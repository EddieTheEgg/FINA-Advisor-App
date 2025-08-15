from datetime import timedelta, date
from dateutil.relativedelta import relativedelta
from sqlalchemy import func
import logging
from backend.src.budgets.model import BudgetCategoryResponse, BudgetCategoryListResponse, BudgetCreateRequest, BudgetDetailResponse, BudgetInsightData, BudgetListResponse, BudgetResponse, BudgetTransactionSummary, CoreBudgetData, BudgetTransactionsResponse
from sqlalchemy.orm import Session
from uuid import UUID

from backend.src.categories.model import CategoryResponse
from backend.src.entities.audit_logs import AuditLog
from backend.src.entities.category import Category
from backend.src.entities.budgets import Budget
from backend.src.entities.enums import AuditAction, BudgetSpendingStatus, TransactionType
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
    
    

def get_budget_details_service(
    db: Session,
    user_id: UUID,
    budget_id: UUID,
) -> BudgetDetailResponse: 
    try:
        budget = db.query(Budget).filter(Budget.budget_id == budget_id).first()
        
        if not budget:
            logging.error(f"Error getting budget details: Budget not found")
            raise BudgetFetchError(f"Error getting budget details: Budget not found")
        
        #Get category data for the budget
        category_data = category_service.get_category_by_id(db, budget.category_id, user_id)
        
        if not category_data:
            logging.error(f"Error getting budget details: Category not found")
            raise BudgetCategoryFetchError(f"Error getting budget details: Category not found")
        
        today = date.today()
        days_passed = (today - budget.budget_month).days + 1
        days_remaining = (budget.budget_month + relativedelta(months=1) - today).days
        
        #Get the total amount spent on the category for the month
        total_spent = get_budget_spent(db, budget.category_id, user_id, budget.budget_month)
        daily_average = round(total_spent / days_passed, 2) if days_passed > 0 else 0
        
        projected_total = round(total_spent + (days_remaining * daily_average), 2)
        
        if (projected_total == 0):
            status_type = BudgetSpendingStatus.NO_DATA
        elif (projected_total <= budget.budget_amount):
            status_type = BudgetSpendingStatus.ON_TRACK
        elif (projected_total > budget.budget_amount and total_spent < budget.budget_amount):
            status_type = BudgetSpendingStatus.WARNING
        else:
            status_type = BudgetSpendingStatus.OVER_BUDGET
            
        daily_allowance_limit = round(budget.budget_amount / days_remaining, 2)
        
        recent_budget_transactions = db.query(Transaction).join(
            Category, Transaction.category_id == Category.category_id
        ).filter(
            Transaction.category_id == budget.category_id,
            Transaction.user_id == user_id,
        ).order_by(Transaction.transaction_date.desc()).limit(5).all()

        transaction_list = []
        for transaction in recent_budget_transactions:
            transaction_data = BudgetTransactionSummary(
                category_color = transaction.category.color,
                category_icon = transaction.category.icon,
                transaction_title = transaction.title,
                transaction_date = transaction.transaction_date,
                transaction_amount = transaction.amount,
                transaction_id = transaction.transaction_id,
            )
            transaction_list.append(transaction_data)
        
        
        return BudgetDetailResponse(
            core_budget_data = CoreBudgetData(
                budget_title = category_data.category_name,
                budget_color = category_data.color,
                budget_icon = category_data.icon,
                budget_period = budget.budget_month,
                daily_average = daily_average,
                budget_amount = budget.budget_amount,
                spent_amount = total_spent,
                days_remaining = days_remaining,
                projected_total = projected_total,
            ),
            budget_insight = BudgetInsightData(
                status_type = status_type,
                daily_allowance_limit = daily_allowance_limit,
            ),
            recent_budget_transactions = transaction_list,
        )
    except Exception as e:
        logging.error(f"Error getting budget details: {e}")
        raise BudgetFetchError(f"Error getting budget details: {e}")
        
        
def get_budget_transactions_service(
    db: Session,
    user_id: UUID,
    budget_id: UUID,
    skip: int,
    limit: int,
) -> BudgetTransactionsResponse:
    try:
        budget = db.query(Budget).filter(Budget.budget_id == budget_id, Budget.user_id == user_id).first()
        
        if not budget:
            logging.error(f"Error getting budget transactions: Budget not found")
            raise BudgetFetchError(f"Error getting budget transactions: Budget not found")
        
        budget_transactions = db.query(Transaction).join(
            Category, Transaction.category_id == Category.category_id
        ).filter(
            Transaction.category_id == budget.category_id,
            Transaction.user_id == user_id,
        ).order_by(Transaction.transaction_date.desc()).offset(skip).limit(limit).all()
        
        transaction_list = []
        for transaction in budget_transactions:
            transaction_data = BudgetTransactionSummary(
                category_color = transaction.category.color,
                category_icon = transaction.category.icon,
                transaction_title = transaction.title,
                transaction_date = transaction.transaction_date,
                transaction_amount = transaction.amount,
                transaction_id = transaction.transaction_id,
            )
            transaction_list.append(transaction_data)
            
        # Get total count of all transactions for this budget category
        total_transaction_count = db.query(Transaction).filter(
            Transaction.category_id == budget.category_id,
            Transaction.user_id == user_id,
        ).count()
        
        return BudgetTransactionsResponse(
            transactions = transaction_list,
            transaction_count = total_transaction_count,
            has_next = skip + limit < total_transaction_count,
            current_page = skip // limit + 1,
            page_size = limit,
        )
    except Exception as e:
        logging.error(f"Error getting budget transactions: {e}")
        raise BudgetFetchError(f"Error getting budget transactions: {e}")
    
    
def delete_budget_service(
    db: Session,
    user_id: UUID,
    budget_id: UUID,
) -> None:
    try:
        budget = db.query(Budget).filter(Budget.budget_id == budget_id, Budget.user_id == user_id).first()
        
        if not budget:
            logging.error(f"Error deleting budget: Budget not found")
            raise BudgetFetchError(f"Error deleting budget: Budget not found")
        
        #Add to audit log
        import json
        old_data = {
            "budget_id": str(budget.budget_id),
            "user_id": str(budget.user_id),
            "category_id": str(budget.category_id),
            "budget_amount": budget.budget_amount,
            "budget_month": budget.budget_month.isoformat() if budget.budget_month else None,
            "created_at": budget.created_at.isoformat() if budget.created_at else None,
            "updated_at": budget.updated_at.isoformat() if budget.updated_at else None,
            "notes": 'This budget was deleted by the user',
        }
        
        audit_log = AuditLog(
            user_id = user_id,
            action = AuditAction.DELETE,
            record_id = budget_id,
            old_data = old_data,
        )
        db.add(audit_log)
        db.delete(budget)
        
        db.commit()
        
    except Exception as e:
        logging.error(f"Error deleting budget: {e}")
        raise BudgetFetchError(f"Error deleting budget: {e}")