from fastapi import APIRouter, Query

from backend.src.auth.service import CurrentUser
from backend.src.dashboard.model import DashboardResponse
from backend.src.database.core import DbSession
from backend.src.dashboard import service


router = APIRouter(
    prefix = '/dashboard',
    tags = ['dashboard']
)

@router.get("/userDashboard", response_model = DashboardResponse)
async def get_dashboard(
    db: DbSession,
    current_user: CurrentUser,
    month: int = Query(..., ge=1, le=12, description="Month (1-12)"),
    year: int = Query(..., description="Year"),
):
    return service.get_dashboard(db, current_user.get_uuid(), month, year)