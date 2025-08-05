from fastapi import APIRouter

from backend.src.auth.service import CurrentUser
from backend.src.database.core import DbSession
from backend.src.insights.model import KeyInsightsResponse
from backend.src.insights import service as insights_service

router = APIRouter(
    prefix='/insights',
    tags=['insights']
)

# Gets the current month key insights for the user
@router.get('/monthly-insights', response_model=KeyInsightsResponse)
async def get_key_insights(
    db: DbSession,
    current_user: CurrentUser,
) -> KeyInsightsResponse:
    return insights_service.get_key_insights(db, current_user.user_id)