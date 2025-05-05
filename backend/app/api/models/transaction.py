from sqlalchemy import Column, Float, ForeignKey, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = Column(UUID(as_uuid=True), primary_key = True, default = uuid.uuid4)
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=True)
    transaction_date = Column(DateTime(timezone=True), nullable=False)
    is_income = Column(Boolean, default=False)
    notes = Column(String, nullable=True)
    merchant = Column(String, nullable=True)
    location = Column(String, nullable=True)
    is_subscription = Column(Boolean, default=False)
    subscription_frequency = Column(String, nullable=True)  # monthly, quarterly, yearly, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"))
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.category_id"), nullable=True)

    # Relationships
    user = relationship("User", back_populates="transactions", cascade="all, delete-orphan")
    category = relationship("Category", back_populates="transactions", cascade="all, delete-orphan")