from datetime import date
from fastapi import APIRouter
from backend.src.budgets.model import BudgetCategoryResponse, BudgetCreateRequest, BudgetResponse
from backend.src.budgets.service import create_budget as create_budget_service, get_unbudgeted_categories_service
from backend.src.database.core import DbSession
from backend.src.auth.service import CurrentUser



router = APIRouter(
    prefix="/budgets",
    tags=["budgets"],
)

@router.get("/getBudgets")
async def get_budgets():
    pass


@router.post("/createBudget")
async def create_budget(
    db: DbSession,
    current_user: CurrentUser,
    budget: BudgetCreateRequest
) -> BudgetResponse:
    return create_budget_service(db, current_user.get_uuid(), budget)


@router.get("/getUnBudgetedCategories")
async def get_unbudgeted_categories(
    db: DbSession,
    current_user: CurrentUser,
    month_date: str,
    skip: int,
    limit: int,
) -> list[BudgetCategoryResponse]:
    return get_unbudgeted_categories_service(db, current_user.get_uuid(), date.fromisoformat(month_date), skip, limit)