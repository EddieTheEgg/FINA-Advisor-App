from fastapi import APIRouter
from starlette import status
from backend.src.auth.service import CurrentUser
from backend.src.database.core import DbSession
from backend.src.transactions.model import TransactionCreate, TransactionResponse
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