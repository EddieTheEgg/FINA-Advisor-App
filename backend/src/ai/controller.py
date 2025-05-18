from uuid import UUID
from fastapi import APIRouter
from backend.src.auth.service import CurrentUser
from backend.src.ai.service import apply_suggestion_to_transaction, suggest_category_from_details
from backend.src.ai.model import (
    ApplySuggestionRequest,
    ApplySuggestionResponse,
    CategorySuggestionResponse, 
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

# Apply a suggestion to a transaction when user actually confirms to use it (either after creating a new transaction or updating an existing one
# or when updating a transaction using AI)
@router.post("/apply-suggestion", response_model=ApplySuggestionResponse)
async def apply_suggestion(
    request: ApplySuggestionRequest,
    current_user: CurrentUser,
    db: DbSession,
):
    return await apply_suggestion_to_transaction(
        db=db,
        user_id=current_user.get_uuid(),
        suggestion_id=request.suggestion_id,
        transaction_id=request.transaction_id
    )