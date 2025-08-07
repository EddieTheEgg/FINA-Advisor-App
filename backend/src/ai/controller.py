from uuid import UUID
from fastapi import APIRouter, Query
from backend.src.auth.service import CurrentUser
from backend.src.ai.service import apply_suggestion_to_transaction, suggest_category_from_details, generate_smart_saving_tip, gather_financial_context
from backend.src.ai.model import (
    ApplySuggestionRequest,
    ApplySuggestionResponse,
    CategorySuggestionResponse, 
    SuggestCategoryRequest,
    SmartSavingTipRequest,
    SmartSavingTipResponse,
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

# Generate smart saving tips based on user's financial data
@router.post("/smart-saving-tip", response_model=SmartSavingTipResponse)
async def get_smart_saving_tip(
    request: SmartSavingTipRequest,
    current_user: CurrentUser,
    db: DbSession,
):
    return await generate_smart_saving_tip(
        db=db,
        request=request
    )

# Generate smart saving tip with automatic financial context gathering
@router.get("/smart-saving-tip/auto", response_model=SmartSavingTipResponse)
async def get_smart_saving_tip_auto(
    current_user: CurrentUser,
    db: DbSession,
    month: int = Query(None, ge=1, le=12, description="Month (1-12) - optional, defaults to current month"),
    year: int = Query(None, description="Year - optional, defaults to current year"),
):
    # Gather financial context automatically
    financial_context = await gather_financial_context(
        db=db,
        user_id=current_user.get_uuid(),
        month=month,
        year=year
    )
    
    # Create request with gathered context
    request = SmartSavingTipRequest(
        financial_context=financial_context,
        client_reference=None
    )
    
    return await generate_smart_saving_tip(
        db=db,
        request=request
    )