from sqlalchemy import Column, Float, ForeignKey, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from backend.src.database.core import Base

class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = Column(UUID(as_uuid=True), primary_key = True, default = uuid.uuid4)
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=True)
    transaction_date = Column(DateTime(timezone=True), nullable=False)
    is_income = Column(Boolean, default=False)
    notes = Column(String, nullable=True)
    location = Column(String, nullable=True)
    is_subscription = Column(Boolean, default=False)
    subscription_frequency = Column(String, nullable=True)  # monthly, quarterly, yearly, etc.
    subscription_start_date = Column(DateTime(timezone=True), nullable=True)
    subscription_end_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), index = True)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.category_id"), index=True, nullable=False)
    merchant = Column(String, nullable=True) # Describe where or who the transaction is with
    payment_type = Column(String, nullable=True) # Credit, Debit, Cash, bank_transfer...
    payment_account = Column(String, nullable=True) # Describes which actual account the payment came from or went to


    # Relationships
    user = relationship("User", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")