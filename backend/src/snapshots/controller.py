from fastapi import APIRouter

from backend.src.auth.service import CurrentUser
from backend.src.database.core import DbSession
from backend.src.snapshots import service
from backend.src.snapshots.model import SnapshotResponse

router = APIRouter(prefix="/snapshots", tags=["snapshots"])

# Create initial baseline snapshot for user (called during onboarding).
@router.post("/baseline", response_model=SnapshotResponse)
async def create_baseline_snapshot(
    db: DbSession,
    current_user: CurrentUser,
):
    return service.create_user_baseline_snapshot(db, current_user.user_id)

# Admin endpoint for running monthly snapshots job (manually during dev for now)
# In production, this would be called by a cron job or scheduled task.
@router.post("/monthly-job", response_model = None)
async def run_monthly_snapshots_job(
    db: DbSession,
):
    service.create_monthly_snapshots(db)
    return {"message": "Monthly snapshot jobs completed successfully"}
