from datetime import date
from uuid import UUID
from fastapi import APIRouter, status
from backend.src.budgets.model import BudgetCategoryListResponse, BudgetCreateRequest, BudgetDetailResponse, BudgetListResponse, BudgetTransactionsResponse, BudgetUpdateRequest
from backend.src.budgets.service import create_budget as create_budget_service, delete_budget_service, get_budget_details_service, get_budget_transactions_service, get_unbudgeted_categories_service, get_budgets_service, update_budget_service
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
) -> BudgetListResponse:
    return get_budgets_service(db, current_user.get_uuid(), date.fromisoformat(month_date), skip, limit)

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
    month_date: str, # Must be in the form YYY-MM-01 for matching to work in row iterations
    skip: int,
    limit: int,
) -> BudgetCategoryListResponse:
    return get_unbudgeted_categories_service(db, current_user.get_uuid(), date.fromisoformat(month_date), skip, limit)

@router.get("/getBudgetDetails")
async def get_budget_details(
    db: DbSession,
    current_user: CurrentUser,
    budget_id: str,
    month_date: str,
) -> BudgetDetailResponse:
    return get_budget_details_service(db, current_user.get_uuid(), UUID(budget_id), date.fromisoformat(month_date))

@router.get("/getBudgetTransactions")
async def get_budget_transactions(
    db: DbSession,
    current_user: CurrentUser,
    month_date: str,
    budget_id: str,
    skip: int,
    limit: int,
) -> BudgetTransactionsResponse:
    return get_budget_transactions_service(db, current_user.get_uuid(), UUID(budget_id), skip, limit)

@router.delete("/deleteBudget", status_code = status.HTTP_200_OK)
async def delete_budget(
    db: DbSession,
    current_user: CurrentUser,
    budget_id: str,
) -> None:
    return delete_budget_service(db, current_user.get_uuid(), UUID(budget_id))

@router.put("/updateBudget", status_code = status.HTTP_200_OK)
async def update_budget(
    db: DbSession,
    current_user: CurrentUser,
    budget_update_data: BudgetUpdateRequest,
) -> None:
    return update_budget_service(db, current_user.get_uuid(), budget_update_data)