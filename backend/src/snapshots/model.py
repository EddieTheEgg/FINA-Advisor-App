from pydantic import BaseModel
from typing import Dict, Any
from uuid import UUID
from datetime import date
from backend.src.entities.enums import SnapshotType


class SnapshotResponse(BaseModel):
    snapshot_id: UUID
    user_id: UUID
    account_id: UUID | None = None
    snapshot_date: date
    snapshot_type: SnapshotType
    amount: float
    additional_data: Dict[str, Any] | None = None
    created_at: str
    updated_at: str | None = None

    class Config:
        from_attributes = True


