from uuid import UUID
from fastapi import APIRouter
from backend.src.auth.model import CurrentUser
from backend.src.ai.service import apply_category_to_transaction, suggest_category_from_details
from backend.src.ai.model import (
    CategorySuggestionResponse, 
    ApplyCategoryRequest, 
    ApplyCategoryResponse,
    SuggestCategoryRequest,
)
from backend.src.database.core import DbSession

# Create router
router = APIRouter(
    prefix="/ai",
    tags=["AI"],
    responses={404: {"description": "Not found"}},
)

# Suggest a category based on transaction details (works for both new and existing transactions)
@router.post("/suggest-category", response_model=CategorySuggestionResponse)
async def suggest_category(
    request: SuggestCategoryRequest,  
    current_user: CurrentUser,
    db: DbSession,
):
    return await suggest_category_from_details(
        db=db,
        user_id=current_user.get_uuid(),
        request=request
    )

