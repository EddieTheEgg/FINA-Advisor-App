from sqlalchemy import Column, Date, Float, ForeignKey, String, Boolean, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from backend.src.database.core import Base
from backend.src.entities.enums import SubscriptionFrequency, TransactionType

class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = Column(UUID(as_uuid=True), primary_key = True, default = uuid.uuid4)
    amount = Column(Float, nullable=False)
    title = Column(String, nullable=False)
    transaction_date = Column(Date, nullable=False)
    transaction_type = Column(Enum(TransactionType, name='transactiontype'), nullable=False, default=TransactionType.EXPENSE)
    notes = Column(String, nullable=True)
    location = Column(String, nullable=True)
    is_subscription = Column(Boolean, default=False)
    subscription_frequency = Column(Enum(SubscriptionFrequency, name='subscriptionfrequency'), nullable=True)
    subscription_start_date = Column(Date, nullable=True)
    subscription_end_date = Column(Date, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    #Foreign Keys
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), index = True)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.category_id"), index=True, nullable=False)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.account_id"), nullable=False, index=True)
    to_account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.account_id"), nullable=True, index=True)
    
    #Transaction Details
    merchant = Column(String, nullable=True) # Describe where or who the transaction is (the other party)

    # Relationships
    user = relationship("User", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")
    account = relationship("Account", back_populates="transactions", foreign_keys=[account_id])
    to_account = relationship("Account", back_populates="transfers", foreign_keys=[to_account_id])