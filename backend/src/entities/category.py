from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from backend.src.database.core import Base
from backend.src.entities.enums import TransactionType

class Category(Base):
    __tablename__ = "categories"
    
    category_id = Column(UUID(as_uuid=True), primary_key = True, default = uuid.uuid4)
    category_name = Column(String, nullable = False)
    icon = Column(String, nullable = False)
    color = Column(String, nullable = False)
    transaction_type = Column(Enum(TransactionType, name='transactiontype'), nullable = False, default = TransactionType.EXPENSE)
    is_custom = Column(Boolean, nullable = False, default = False)
    category_description = Column(String, nullable = True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), index=True)
    created_at = Column(DateTime(timezone=True), server_default = func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates = "categories")
    transactions = relationship("Transaction", back_populates = "category")
    budgets = relationship("Budget", back_populates = "category")
    
    
    