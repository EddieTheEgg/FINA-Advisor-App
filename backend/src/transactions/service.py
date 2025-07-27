# Create a new transaction
import logging
from uuid import UUID
from xml.etree.ElementTree import tostring
from pytest import Session
from typing import List, Tuple
from datetime import date, datetime, timedelta
from sqlalchemy import desc, func, case
from sqlalchemy.orm import joinedload

from backend.src.categories import service as category_service
from backend.src.categories.model import CategoryResponse, CategorySimplifiedResponse
from backend.src.entities.account import Account
from backend.src.entities.category import Category
from backend.src.entities.transaction import Transaction, TransactionType
from backend.src.entities.enums import SubscriptionFrequency, SubscriptionStatus, TransactionSortBy, SortOrder
from backend.src.exceptions import TransferTransactionError, CreateTransactionError, CategoryNotFoundError, InvalidUserForCategoryError, InvalidUserForTransactionError, TransactionNotFoundError
from backend.src.transactions.model import TransactionCreate, TransactionListRequest, TransactionResponse, TransactionSummary, TransactionUpdate, TransactionListResponse, TransferCreateRequest, TransferCreateResponse, PaginationResponse, SummaryResponse, TransactionAccountResponse
from backend.src.accounts import service as account_service

def create_regular_transaction(
    db: Session,
    transaction_create_request: TransactionCreate,
    user_id: UUID
) -> TransactionResponse:
    """Helper function to create a regular income/expense transaction."""
    new_transaction = Transaction(
        amount=transaction_create_request.amount,
        title=transaction_create_request.title,
        transaction_date=transaction_create_request.transaction_date,
        transaction_type=transaction_create_request.transaction_type,
        notes=transaction_create_request.notes,
        location=transaction_create_request.location,
        is_subscription=transaction_create_request.is_subscription,
        subscription_frequency=transaction_create_request.subscription_frequency,
        subscription_start_date=transaction_create_request.subscription_start_date,
        subscription_end_date=transaction_create_request.subscription_end_date,
        category_id=UUID(transaction_create_request.category_id),
        account_id=UUID(transaction_create_request.account_id),
        merchant=transaction_create_request.merchant,
        user_id=user_id
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    
    # Update the account balance
    amount = transaction_create_request.amount
    if transaction_create_request.transaction_type == TransactionType.EXPENSE:
        amount = -1 * amount
    account_service.update_account_balance(db, transaction_create_request.account_id, user_id, amount)
    
    # Query the account and category for the response
    account = db.query(Account).filter(Account.account_id == transaction_create_request.account_id).first()
    category = db.query(Category).filter(Category.category_id == transaction_create_request.category_id).first()
    
    if new_transaction.transaction_type == TransactionType.TRANSFER:
        to_account = db.query(Account).filter(Account.account_id == new_transaction.to_account_id).first()
        account_name = account.name
        account_icon = account.icon
        account_color = account.color
        to_account_name = to_account.name
        to_account_icon = to_account.icon
        to_account_color = to_account.color
    else:
        to_account = None
        account_name = account.name
        account_icon = account.icon
        account_color = account.color
        to_account_name = None
        to_account_icon = None
        to_account_color = None
    
    return TransactionResponse(
        transaction_id=new_transaction.transaction_id,
        account_id=(new_transaction.account_id),
        amount=new_transaction.amount,
        title=new_transaction.title,
        transaction_date=new_transaction.transaction_date,
        transaction_type=new_transaction.transaction_type,
        notes=new_transaction.notes,
        location=new_transaction.location,
        is_subscription=new_transaction.is_subscription,
        subscription_frequency=new_transaction.subscription_frequency,
        subscription_start_date=new_transaction.subscription_start_date,
        subscription_end_date=new_transaction.subscription_end_date,
        source_account=TransactionAccountResponse(
            account_id=new_transaction.account_id,
            name=account_name,
            account_type=account.account_type,
            balance=account.balance,
            color=account.color,
            icon=account.icon,
            credit_limit=account.credit_limit,
        ),
        to_account=TransactionAccountResponse(
            account_id=new_transaction.to_account_id,
            name=to_account_name,
            account_type=to_account.account_type,
            balance=to_account.balance,
            color=to_account.color,
            icon=to_account.icon,
            credit_limit=to_account.credit_limit,
        ) if to_account else None,
        merchant=new_transaction.merchant,
        created_at=new_transaction.created_at,
        updated_at=new_transaction.updated_at,
        category=CategoryResponse(
            category_id=new_transaction.category_id,
            category_name=category.category_name,
            icon=category.icon,
            color=category.color,
            transaction_type=category.transaction_type,
            category_description=category.category_description,
            is_custom=category.is_custom,
            created_at=category.created_at,
            updated_at=category.updated_at
        )   
    )

# Creates a new transaction entry in the database
def create_transaction(db: Session, transaction_create_request: TransactionCreate, user_id: UUID) -> TransactionResponse:
    try:
        category = db.query(Category).filter(Category.category_id == transaction_create_request.category_id).first()
        if not category:
            raise CategoryNotFoundError(transaction_create_request.category_id)
        
        if category.user_id != user_id:
            logging.warning(f"Category with id {transaction_create_request.category_id} not valid for this user")
            raise InvalidUserForCategoryError(transaction_create_request.category_id)
        
        new_transaction = create_regular_transaction(db, transaction_create_request, user_id)
        logging.info(f"Created new transaction for user {user_id} : {new_transaction.title}")
        return new_transaction
    except Exception as e:
        logging.error(f"Error creating transaction for user {user_id}: {str(e)}")
        raise CreateTransactionError(str(e))

#Acquires a single transaction by id (transaction_id), helper for update and delete
def get_transaction_by_id(db: Session, transaction_id: UUID, user_id: UUID) -> TransactionResponse:
    transaction = (
        db.query(Transaction)
        .options(
            joinedload(Transaction.category),
            joinedload(Transaction.account),
            joinedload(Transaction.to_account)
        )
        .filter(Transaction.transaction_id == transaction_id, Transaction.user_id == user_id)
        .first()
    )
    
    if not transaction:
        logging.warning(f"Transaction with id {transaction_id} not found for user {user_id}")
        raise TransactionNotFoundError(transaction_id)
    
    if transaction.user_id != user_id:
        logging.warning(f"Transaction with id {transaction_id} not found for user {user_id}")
        raise InvalidUserForTransactionError(transaction_id)
    
    return TransactionResponse(
        transaction_id = transaction.transaction_id,
        account_id = transaction.account_id,
        amount = transaction.amount,
        title = transaction.title,
        transaction_date = transaction.transaction_date,
        transaction_type = transaction.transaction_type,
        notes = transaction.notes,
        location = transaction.location,
        is_subscription = transaction.is_subscription,
        subscription_frequency = transaction.subscription_frequency,
        subscription_start_date = transaction.subscription_start_date,
        subscription_end_date = transaction.subscription_end_date,
        subscription_next_payment_date = calculate_next_payment_date(transaction.subscription_frequency, transaction.subscription_start_date, transaction.subscription_end_date),        
        source_account = TransactionAccountResponse(
            account_id = transaction.account.account_id,
            name = transaction.account.name,
            account_type = transaction.account.account_type,
            balance = transaction.account.balance,
            color = transaction.account.color,
            icon = transaction.account.icon,
            credit_limit = transaction.account.credit_limit,
        ),
        to_account = TransactionAccountResponse(
            account_id = transaction.to_account.account_id,
            name = transaction.to_account.name,
            account_type = transaction.to_account.account_type,
            balance = transaction.to_account.balance,
            color = transaction.to_account.color,
            icon = transaction.to_account.icon,
            credit_limit = transaction.to_account.credit_limit,
        ) if transaction.to_account else None,
        merchant = transaction.merchant,
        created_at = transaction.created_at,
        updated_at = transaction.updated_at,
        category = CategoryResponse(
            category_id = transaction.category.category_id,
            category_name = transaction.category.category_name,
            icon = transaction.category.icon,
            color = transaction.category.color,
            transaction_type = transaction.category.transaction_type,
            category_description = transaction.category.category_description,
            is_custom = transaction.category.is_custom,
            created_at = transaction.category.created_at,
            updated_at = transaction.category.updated_at
        )
    )

#Helper function to calculate the next payment date for a subscription
def calculate_next_payment_date(
    subscription_frequency: SubscriptionFrequency,
    subscription_start_date: date | None,
    subscription_end_date: date | None
) -> date | None:
    from dateutil.relativedelta import relativedelta
    
    if subscription_frequency is None or subscription_start_date is None:
        return None
    
    # Work with dates only to avoid timezone complications
    today = datetime.now().date()
    start_date = subscription_start_date
    end_date = subscription_end_date
    
    # If subscription ended, no next date
    if end_date and today > end_date:
        return None
    
    next_date = start_date
    
    # Calculate next occurrence after today
    while next_date <= today:
        if subscription_frequency == SubscriptionFrequency.DAILY:
            next_date += timedelta(days=1)
        elif subscription_frequency == SubscriptionFrequency.WEEKLY:
            next_date += timedelta(weeks=1)  
        elif subscription_frequency == SubscriptionFrequency.MONTHLY:
            next_date += relativedelta(months=1)
        elif subscription_frequency == SubscriptionFrequency.QUARTERLY:
            next_date += relativedelta(months=3)
        elif subscription_frequency == SubscriptionFrequency.YEARLY:
            next_date += relativedelta(years=1)
    
    # Check if next date exceeds end date
    if subscription_end_date and next_date > subscription_end_date:
        return None
    
    return next_date
    




def get_transaction_list(db: Session, user_id: UUID, request_data: TransactionListRequest, offset: int, limit: int) -> TransactionListResponse:
    start_date = request_data.transaction_timeframe
    # Get the last day of the month
    if start_date.month == 12:
        end_date = start_date.replace(year=start_date.year + 1, month=1, day=1) - timedelta(days=1)
    else:
        end_date = start_date.replace(month=start_date.month + 1, day=1) - timedelta(days=1)
    
    # Base filter which only grabs transactions for the given month and year
    base_filter = [
        Transaction.user_id == user_id,
        Transaction.transaction_date.between(start_date, end_date)
    ]
    
    # Only add transaction type filter if not requesting ALL
    if request_data.transaction_type != TransactionType.ALL:
        base_filter.append(Transaction.transaction_type == request_data.transaction_type)
    
    # Optional Filter logic
    if request_data.account_ids:
        # Convert string UUIDs to UUID objects for database filtering
        account_uuids = [UUID(account_id) for account_id in request_data.account_ids]
        base_filter.append(Transaction.account_id.in_(account_uuids))
    if request_data.category_ids:
        # Convert string UUIDs to UUID objects for database filtering
        category_uuids = [UUID(category_id) for category_id in request_data.category_ids]
        base_filter.append(Transaction.category_id.in_(category_uuids))
    
    # Determine sorting
    sort_field_mapping = {
        TransactionSortBy.TRANSACTION_DATE: Transaction.transaction_date,
        TransactionSortBy.AMOUNT: Transaction.amount,
        TransactionSortBy.TITLE: Transaction.title,
        None: Transaction.transaction_date  # Default sort
    }
    
    sort_field = sort_field_mapping.get(request_data.sort_by, Transaction.transaction_date)
    
    if request_data.sort_order == SortOrder.ASC:
        order_by_clause = sort_field.asc()
    else:
        order_by_clause = sort_field.desc()  # Default to DESC
    
    # OPTIMIZED: Single query with eager loading for transactions
    transactions = (
        db.query(Transaction)
        .options(
            joinedload(Transaction.category),
            joinedload(Transaction.account),
            joinedload(Transaction.to_account)
        )
        .filter(*base_filter)
        .order_by(order_by_clause)
        .offset(offset)
        .limit(limit)
        .all()
    )
    
    # OPTIMIZED: Single aggregation query for both count and summary totals
    summary_data = (
        db.query(
            func.count(Transaction.transaction_id).label('total_count'),
            func.coalesce(
                func.sum(case((Transaction.transaction_type == TransactionType.INCOME, Transaction.amount), else_=0)), 
                0
            ).label('month_income'),
            func.coalesce(
                func.sum(case((Transaction.transaction_type == TransactionType.EXPENSE, Transaction.amount), else_=0)), 
                0
            ).label('month_expense'),
            func.coalesce(
                func.sum(case((Transaction.transaction_type == TransactionType.TRANSFER, Transaction.amount), else_=0)), 
                0
            ).label('month_transfer')
        )
        .filter(*base_filter)
        .first()
    )
    
    # Calculate pagination info
    total_transactions = summary_data.total_count
    current_page = (offset // limit) + 1
    has_next = (offset + limit) < total_transactions
    
    # Build simplified transactions list
    simplified_transactions = [TransactionSummary(
        transaction_id=x.transaction_id,
        amount=x.amount,
        title=x.title,
        transaction_date=x.transaction_date,
        transaction_type=x.transaction_type,
        category=CategorySimplifiedResponse(
            category_id=x.category.category_id,
            category_name=x.category.category_name,
            icon=x.category.icon,
            color=x.category.color,
            is_custom=x.category.is_custom,
        ),
        account_name=x.account.name,
        to_account_name=x.to_account.name if x.to_account else None,
    ) for x in transactions]
    
    # Get all possible categories for the user, 100 which we can accept as a limit for now
    possible_categories = category_service.get_user_categories(db, user_id, 0, 100, True, request_data.transaction_type)
    
    return TransactionListResponse(
        transactions=simplified_transactions,
        pagination=PaginationResponse(
            has_next=has_next,
            current_page=current_page,
            page_size=limit
        ),
        summary=SummaryResponse(
            month_income=float(summary_data.month_income),
            month_expense=float(summary_data.month_expense),
            month_transfer=float(summary_data.month_transfer)
        ),
        possible_categories=possible_categories.categories
    )

# Updates a transaction entry in the database
def update_transaction(db: Session, transaction_id: UUID, transaction_update_request: TransactionUpdate, user_id: UUID) -> TransactionResponse:
    transaction = get_transaction_by_id(db, transaction_id, user_id)
    
    # Check if the category (could be new or existing) exists and belongs to the user
    new_existing_category = category_service.get_category_by_id(db, transaction_update_request.category_id, user_id)
    
    transaction.amount = transaction_update_request.amount
    transaction.title = transaction_update_request.title
    transaction.transaction_date = transaction_update_request.transaction_date
    transaction.is_income = transaction_update_request.is_income
    transaction.notes = transaction_update_request.notes
    transaction.location = transaction_update_request.location
    transaction.is_subscription = transaction_update_request.is_subscription
    transaction.subscription_frequency = transaction_update_request.subscription_frequency
    transaction.subscription_start_date = transaction_update_request.subscription_start_date
    transaction.subscription_end_date = transaction_update_request.subscription_end_date
    transaction.category_id = new_existing_category.category_id
    transaction.payment_type = transaction_update_request.payment_type
    transaction.merchant = transaction_update_request.merchant
    transaction.payment_account = transaction_update_request.payment_account

    db.commit()
    db.refresh(transaction)
    logging.info(f"Updated transaction {transaction_id} for user {user_id}")
    return transaction

def delete_transaction(db: Session, transaction_id: UUID, user_id: UUID) -> None:
    transaction = get_transaction_by_id(db, transaction_id, user_id)
    db.delete(transaction)
    db.commit()
    logging.info(f"Deleted transaction {transaction_id} for user {user_id}")


def create_transfer_transaction(
    db: Session,
    transfer_create_request: TransferCreateRequest,
    user_id: UUID,
) -> TransferCreateResponse:
    try: 
        # Convert frontend field names to UUIDs
        from_account_id = UUID(transfer_create_request.fromAccount)
        to_account_id = UUID(transfer_create_request.toAccount)
        
        # Verify both accounts belong to the user
        from_account = account_service.get_account_by_id(db, from_account_id, user_id)
        to_account = account_service.get_account_by_id(db, to_account_id, user_id)
        
        new_transfer_transaction = Transaction(
            amount = transfer_create_request.amount,
            title = transfer_create_request.title,
            transaction_date = datetime.now(),
            transaction_type = TransactionType.TRANSFER,
            notes = transfer_create_request.note,
            location = transfer_create_request.location,
            is_subscription = False, #Default false for now, will implement toggle later
            subscription_frequency = None,
            subscription_start_date = None,
            subscription_end_date = None,
            category_id = category_service.get_transfer_category(db, user_id),
            account_id = from_account_id,
            to_account_id = to_account_id,
            merchant = "Self",
            user_id = user_id
        )
        db.add(new_transfer_transaction)
        db.commit()
        db.refresh(new_transfer_transaction)
        
        #Update both account balances
        account_service.update_account_balance(db, from_account_id, user_id, -transfer_create_request.amount)
        account_service.update_account_balance(db, to_account_id, user_id, transfer_create_request.amount)
        
        logging.info(f"Created new transfer transaction for user {user_id}")
        return TransferCreateResponse(
            fromAccount=transfer_create_request.fromAccount,
            toAccount=transfer_create_request.toAccount,
            amount=transfer_create_request.amount,
            title=transfer_create_request.title,
            note=transfer_create_request.note,
            location=transfer_create_request.location
        )
    except Exception as e:
        logging.error(f"Error creating transfer transaction for user {user_id}: {str(e)}")
        raise TransferTransactionError(str(e))