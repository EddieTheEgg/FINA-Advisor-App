from datetime import date
from fastapi import APIRouter, status
from backend.src.budgets.model import BudgetCategoryListResponse, BudgetCategoryResponse, BudgetCreateRequest, BudgetResponse
from backend.src.budgets.service import create_budget as create_budget_service, get_unbudgeted_categories_service
from backend.src.database.core import DbSession
from backend.src.auth.service import CurrentUser



router = APIRouter(
    prefix="/budgets",
    tags=["budgets"],
)

@router.get("/getBudgets")
async def get_budgets(
    db: DbSession,
    current_user: CurrentUser,
    month_date: str,
    skip: int,
    limit: int,
) -> BudgetResponse:
    #return get_budget_service(db, current_user.get_uuid(), month_date, skip, limit)
    pass

@router.post("/createBudget", status_code = status.HTTP_201_CREATED)
async def create_budget(
    db: DbSession,
    current_user: CurrentUser,
    budget: BudgetCreateRequest
) -> None:
    return create_budget_service(db, current_user.get_uuid(), budget)


@router.get("/getUnBudgetedCategories")
async def get_unbudgeted_categories(
    db: DbSession,
    current_user: CurrentUser,
    month_date: str,
    skip: int,
    limit: int,
) -> BudgetCategoryListResponse:
    return get_unbudgeted_categories_service(db, current_user.get_uuid(), date.fromisoformat(month_date), skip, limit)