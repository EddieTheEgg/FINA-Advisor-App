from sqlalchemy import Column, ForeignKey, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
    
from backend.src.database.core import Base

class Category(Base):
    __tablename__ = "categories"
    
    category_id = Column(UUID(as_uuid=True), primary_key = True, default = uuid.uuid4)
    category_name = Column(String, nullable = False)
    icon = Column(String, nullable = True)
    color = Column(String, nullable = True)
    is_income = Column(Boolean, default = False)
    is_custom = Column(Boolean, default = False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), index=True)
    created_at = Column(DateTime(timezone=True), server_default = func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates = "categories")
    transactions = relationship("Transaction", back_populates = "category")
    
    
    