from datetime import datetime
from typing import List
from uuid import UUID
from fastapi import APIRouter, Query
from datetime import date
from starlette import status
from backend.src.auth.service import CurrentUser
from backend.src.database.core import DbSession
from backend.src.transactions.model import TransactionCreate, TransactionListRequest, TransactionListResponse, TransactionResponse, TransactionType, TransactionUpdate, TransferCreateRequest, TransferCreateResponse
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

# Get transactions with basic calendar/transaction type filtering and pagination
@router.post("/transaction-list", response_model = TransactionListResponse, status_code = status.HTTP_200_OK)
def get_transaction_list(
    db: DbSession,
    current_user: CurrentUser,
    request_data: TransactionListRequest,
    offset: int = Query(0, ge=0, description="Offset for pagination"),
    limit: int = Query(10, gt=0, le=30, description="Number of transactions to fetch")
):
    return service.get_transaction_list(db, current_user.get_uuid(), request_data, offset, limit)


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

@router.post("/transfer", response_model = TransferCreateResponse, status_code = status.HTTP_200_OK)
def transfer_transaction(
    db: DbSession,
    transfer_create_request: TransferCreateRequest,
    current_user: CurrentUser,
):
    return service.create_transfer_transaction(db, transfer_create_request, current_user.get_uuid())