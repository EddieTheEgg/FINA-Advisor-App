from fastapi import APIRouter

router = APIRouter(
    prefix='/categories',
    tags=['categories']
)

@router.get("/")
def get_categories():
    # Some implementation
    return {"message": "List of categories"}

@router.post("/")
def create_category():
    # Some implementation
    return {"message": "Category created"}

