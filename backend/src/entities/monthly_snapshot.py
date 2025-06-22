import uuid
from sqlalchemy import JSON, Boolean, Column, DateTime, DECIMAL, Float, String, ForeignKey, Enum, Date, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.src.database.core import Base

from backend.src.entities.enums import SnapshotType

class MonthlySnapshot(Base):
    __tablename__ = "monthly_snapshots"
    
    snapshot_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False, index=True)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.account_id"), nullable=True, index=True)
    snapshot_type = Column(Enum(SnapshotType, name='snapshottype'), nullable=False)
    snapshot_date = Column(Date, nullable=False)
    additional_data = Column(JSON, nullable=True)
    amount = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="monthly_snapshots")
    account = relationship("Account", back_populates="monthly_snapshots")

    # Indexes for performance
    __table_args__ = (
        Index('ix_monthly_snapshots_user_snapshot_date', 'user_id', 'snapshot_type', 'snapshot_date'),
        Index('ix_monthly_snapshots_account_snapshot_date', 'account_id', 'snapshot_type', 'snapshot_date'),
    ) 