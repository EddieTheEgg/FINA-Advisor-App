from datetime import datetime
from typing import List
from uuid import UUID
from fastapi import APIRouter
from starlette import status
from backend.src.auth.service import CurrentUser
from backend.src.database.core import DbSession
from backend.src.transactions.model import TransactionCreate, TransactionListResponse, TransactionResponse, TransactionType, TransactionUpdate
from backend.src.transactions import service
router = APIRouter(
    prefix='/transactions',
    tags=['transactions']
)

@router.post("/create-transaction", response_model = TransactionResponse, status_code = status.HTTP_201_CREATED)
def create_transactions(
    db: DbSession,
    transaction_create_request: TransactionCreate,
    current_user: CurrentUser
):
    return service.create_transaction(db, transaction_create_request, current_user.get_uuid())

@router.get("/single-transaction", response_model = TransactionResponse)
def get_transaction_by_id(
    db: DbSession,
    transaction_id: UUID,
    current_user: CurrentUser
):
    return service.get_transaction_by_id(db, transaction_id, current_user.get_uuid())

# Get transactions with filtering and pagination
@router.get("/transactions", response_model = TransactionListResponse)
def get_transactions(
    db: DbSession,
    current_user: CurrentUser,
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
):
    return service.get_transactions_with_filters(
        db,
        current_user.get_uuid(),
        skip,
        limit,
        category_id,
        start_date,
        end_date,
        transaction_type,
        is_subscription,
        subscription_frequency,
        search,
        min_amount,
        max_amount,
        merchant,
        location,
        payment_type,
        payment_account,
        sort_by,
        sort_order
    )
@router.put("/update-transaction", response_model = TransactionResponse, status_code = status.HTTP_200_OK)
def update_transactions(
    db: DbSession,
    transaction_id: UUID,
    transaction_update_request: TransactionUpdate,
    current_user: CurrentUser
):
    return service.update_transaction(db, transaction_id, transaction_update_request, current_user.get_uuid())    

@router.delete("/delete-transaction", status_code = status.HTTP_204_NO_CONTENT)
def delete_transactions(
    db: DbSession,
    transaction_id: UUID,
    current_user: CurrentUser
):
    return service.delete_transaction(db, transaction_id, current_user.get_uuid())