from fastapi import APIRouter

router = APIRouter(
    prefix='/insights',
    tags=['insights']
)

@router.get('/monthly-health')
async def get_monthly_health():
    return {"message": "Monthly health data"}