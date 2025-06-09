# Create a new transaction
import logging
from uuid import UUID
from pytest import Session
from typing import List, Tuple
from datetime import datetime
from sqlalchemy import desc

from backend.src.categories import service
from backend.src.entities.category import Category
from backend.src.entities.transaction import Transaction
from backend.src.exceptions import CategoryNotFoundError, InvalidUserForCategoryError, InvalidUserForTransactionError, TransactionNotFoundError
from backend.src.transactions.model import TransactionCreate, TransactionResponse, TransactionUpdate, TransactionListResponse
from backend.src.accounts import service as account_service

# Creates a new transaction entry in the database
def create_transaction(db: Session, transaction_create_request: TransactionCreate, user_id: UUID) -> TransactionResponse:
    category = db.query(Category).filter(Category.category_id == transaction_create_request.category_id).first()
    if not category:
        raise CategoryNotFoundError(transaction_create_request.category_id)
    
    if category.user_id != user_id:
        logging.warning(f"Category with id {transaction_create_request.category_id} not valid for this user")
        raise InvalidUserForCategoryError(transaction_create_request.category_id)
    
    #Ensures that the transaction's is_income matches the category is_income
    # Assuming user knows the category they chose for the category is expense vs income
    transaction_create_request.is_income = category.is_income
    
    new_transaction = Transaction(
        amount=transaction_create_request.amount,
        title=transaction_create_request.title,
        transaction_date=transaction_create_request.transaction_date,
        is_income=transaction_create_request.is_income,
        notes=transaction_create_request.notes,
        location=transaction_create_request.location,
        is_subscription=transaction_create_request.is_subscription,
        subscription_frequency=transaction_create_request.subscription_frequency,
        subscription_start_date=transaction_create_request.subscription_start_date,
        subscription_end_date=transaction_create_request.subscription_end_date,
        category_id=transaction_create_request.category_id,
        account_id=transaction_create_request.account_id,
        merchant=transaction_create_request.merchant,
        user_id=user_id
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    
    #Update the account balance associated with this transaction
    account_service.update_account_balance(db, transaction_create_request.account_id, user_id, transaction_create_request.amount)
    
    logging.info(f"Created new transaction for user {user_id} : {new_transaction.title}")
    return new_transaction

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
        is_income: bool | None = None,
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
        
        if is_income is not None:
            possible_transactions = possible_transactions.filter(Transaction.is_income == is_income)
            
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
    new_existing_category = service.get_category_by_id(db, transaction_update_request.category_id, user_id)
    
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
