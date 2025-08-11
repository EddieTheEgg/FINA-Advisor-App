import uuid
from sqlalchemy import Column, DateTime, Float, String, Date, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.src.database.core import Base

class Budget(Base):
    __tablename__ = "budgets"

    budget_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False, index=True)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.category_id"), nullable=False)
    budget_name = Column(String, nullable=True)
    budget_amount = Column(Float, nullable=False)
    budget_month = Column(Date, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="budgets")
    category = relationship("Category", back_populates="budgets")
    
    # Indexes for performance
    __table_args__ = (
        Index('ix_budgets_user_id', 'user_id'),
        Index('ix_budgets_category_id', 'category_id'),
        Index('ix_budgets_budget_month', 'budget_month'),
    )
    