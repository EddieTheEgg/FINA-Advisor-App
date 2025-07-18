# Create a new transaction
import logging
from uuid import UUID
from xml.etree.ElementTree import tostring
from pytest import Session
from typing import List, Tuple
from datetime import datetime
from sqlalchemy import desc

from backend.src.categories import service as category_service
from backend.src.categories.model import CategoryResponse, CategorySimplifiedResponse
from backend.src.entities.account import Account
from backend.src.entities.category import Category
from backend.src.entities.transaction import Transaction, TransactionType
from backend.src.exceptions import TransferTransactionError, CreateTransactionError, CategoryNotFoundError, InvalidUserForCategoryError, InvalidUserForTransactionError, TransactionNotFoundError
from backend.src.transactions.model import TransactionCreate, TransactionResponse, TransactionUpdate, TransactionListResponse, TransferCreateRequest, TransferCreateResponse
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
    
    if new_transaction.transaction_type == TransactionType.TRANSFER:
        account_name = db.query(Account).filter(Account.account_id == transaction_create_request.account_id).first().name
        to_account_name = db.query(Account).filter(Account.account_id == new_transaction.to_account_id).first().name
    else:
        account_name = db.query(Account).filter(Account.account_id == transaction_create_request.account_id).first().name
        to_account_name = None
    
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
        account_name=account_name,
        to_account_name=to_account_name,
        merchant=new_transaction.merchant,
        created_at=new_transaction.created_at,
        updated_at=new_transaction.updated_at,
        category=CategoryResponse(
            category_id=new_transaction.category.category_id,
            category_name=new_transaction.category.category_name,
            icon=new_transaction.category.icon,
            color=new_transaction.category.color,
            transaction_type=new_transaction.category.transaction_type,
            category_description=new_transaction.category.category_description,
            is_custom=new_transaction.category.is_custom,
            created_at=new_transaction.category.created_at,
            updated_at=new_transaction.category.updated_at
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
    transaction = db.query(Transaction).filter(Transaction.transaction_id == transaction_id, Transaction.user_id == user_id).first()
    
    if not transaction:
        logging.warning(f"Transaction with id {transaction_id} not found for user {user_id}")
        raise TransactionNotFoundError(transaction_id)
    
    if transaction.user_id != user_id:
        logging.warning(f"Transaction with id {transaction_id} not found for user {user_id}")
        raise InvalidUserForTransactionError(transaction_id)
    
    return transaction

# Get transactions with filtering and pagination
def get_transactions_with_filters(
        db: Session, 
        user_id: UUID, 
        skip: int = 0, 
        limit: int = 100,
        category_id: UUID | None = None,
        start_date: datetime | None = None,
        end_date: datetime | None = None,
        transaction_type: TransactionType | None = None,
        is_subscription: bool | None = None,
        subscription_frequency: str | None = None,
        search: str | None = None,
        min_amount: float | None = None,
        max_amount: float | None = None,
        merchant: str | None = None,
        location: str | None = None,
        payment_type: str | None = None,
        payment_account: str | None = None,
        sort_by: str = "transaction_date",
        sort_order: str = "desc"
    ) -> TransactionListResponse:
    try:
        possible_transactions = db.query(Transaction).filter(Transaction.user_id == user_id)
        
        if category_id:
            category = db.query(Category).filter(
                Category.category_id == category_id,
                Category.user_id == user_id
            ).first()
            if not category:
                logging.warning(f"Category {category_id} not found or doesn't belong to user {user_id}")
                raise InvalidUserForCategoryError(category_id)
            possible_transactions = possible_transactions.filter(Transaction.category_id == category_id)
        
        if start_date:
            possible_transactions = possible_transactions.filter(Transaction.transaction_date >= start_date)
        
        if end_date:
            possible_transactions = possible_transactions.filter(Transaction.transaction_date <= end_date)
        
        if transaction_type is not None:
            possible_transactions = possible_transactions.filter(Transaction.transaction_type == transaction_type)
            
        if is_subscription is not None:
            possible_transactions = possible_transactions.filter(Transaction.is_subscription == is_subscription)
            
        if subscription_frequency:
            possible_transactions = possible_transactions.filter(Transaction.subscription_frequency == subscription_frequency)
            
        if search:
            search_term = f"%{search}%"
            possible_transactions = possible_transactions.filter(
                (Transaction.title.ilike(search_term)) | 
                (Transaction.notes.ilike(search_term)) |
                (Transaction.merchant.ilike(search_term))
            )
            
        if min_amount is not None:
            possible_transactions = possible_transactions.filter(Transaction.amount >= min_amount)
            
        if max_amount is not None:
            possible_transactions = possible_transactions.filter(Transaction.amount <= max_amount)
            
        if merchant:
            possible_transactions = possible_transactions.filter(Transaction.merchant.ilike(f"%{merchant}%"))
            
        if location:
            possible_transactions = possible_transactions.filter(Transaction.location.ilike(f"%{location}%"))
            
        if payment_type:
            possible_transactions = possible_transactions.filter(Transaction.payment_type == payment_type)
            
        if payment_account:
            possible_transactions = possible_transactions.filter(Transaction.payment_account.ilike(f"%{payment_account}%"))
        
        total_count = possible_transactions.count()
        
        # Sorting column process, sort by transaction_date by default
        sort_column = {
            "transaction_date": Transaction.transaction_date,
            "amount": Transaction.amount,
            "created_at": Transaction.created_at,
        }.get(sort_by, Transaction.transaction_date)
            
        if sort_order.lower() == "asc":
            possible_transactions = possible_transactions.order_by(sort_column)
        else:
            possible_transactions = possible_transactions.order_by(desc(sort_column))
            
        final_transactions = possible_transactions.offset(skip).limit(limit).all()
        
        logging.info(f"Retrieved current page of {len(final_transactions)} transactions for user {user_id}")
        return TransactionListResponse(transactions=final_transactions, total=total_count)
    except Exception as e:
        logging.error(f"Error retrieving transactions for user {user_id}: {str(e)}")
        raise

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