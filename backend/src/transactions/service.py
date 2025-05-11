# Create a new transaction
import logging
from uuid import UUID
from pytest import Session

from backend.src.entities.category import Category
from backend.src.entities.transaction import Transaction
from backend.src.exceptions import CategoryNotFoundError, InvalidUserForCategoryError
from backend.src.transactions.model import TransactionCreate, TransactionResponse


def create_transaction(db: Session, transaction_create_request: TransactionCreate, user_id: UUID) -> TransactionResponse:
    category = db.query(Category).filter(Category.category_id == transaction_create_request.category_id).first()
    if not category:
        raise CategoryNotFoundError(transaction_create_request.category_id)
    
    if category.user_id != user_id:
        raise InvalidUserForCategoryError(transaction_create_request.category_id)
    
    #Ensures that the transaction's is_income matches the category is_income
    # Assuming user knows the category they chose for the category is expense vs income
    transaction_create_request.is_income = category.is_income
    
    new_transaction = Transaction(
        amount=transaction_create_request.amount,
        description=transaction_create_request.description,
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
    logging.info(f"Created new transaction for user {user_id} : {new_transaction.description}")
    return new_transaction
    
