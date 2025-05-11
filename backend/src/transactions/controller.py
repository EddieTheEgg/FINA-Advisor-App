from uuid import UUID
from fastapi import APIRouter
from starlette import status
from backend.src.auth.service import CurrentUser
from backend.src.database.core import DbSession
from backend.src.transactions.model import TransactionCreate, TransactionResponse, TransactionUpdate
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