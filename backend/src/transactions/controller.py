from fastapi import APIRouter

router = APIRouter(
    prefix='/transactions',
    tags=['transactions']
)

@router.get("/")
def get_transactions():
    # Some implementation
    return {"message": "List of transactions"}

@router.post("/")
def create_transaction():
    # Some implementation
    return {"message": "Transaction created"}

