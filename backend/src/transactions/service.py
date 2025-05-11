# Create a new transaction
import logging
from uuid import UUID
from pytest import Session

from backend.src.categories import service
from backend.src.entities.category import Category
from backend.src.entities.transaction import Transaction
from backend.src.exceptions import CategoryNotFoundError, InvalidUserForCategoryError, InvalidUserForTransactionError, TransactionNotFoundError
from backend.src.transactions.model import TransactionCreate, TransactionResponse, TransactionUpdate

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
        payment_type=transaction_create_request.payment_type,
        merchant=transaction_create_request.merchant,
        payment_account=transaction_create_request.payment_account,
        user_id=user_id
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
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
