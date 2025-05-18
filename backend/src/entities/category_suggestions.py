import uuid
from sqlalchemy import Column, String, Float, Boolean, DateTime, JSON, Text, func
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime

from backend.src.database.core import Base

class CategoryTraining(Base):
    __tablename__ = "category_suggestions"
    
    suggestion_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    transaction_id = Column(UUID(as_uuid=True), nullable=True)  
    
    # Suggestion details
    request_data = Column(JSON, nullable=False)  
    suggested_category_id = Column(UUID(as_uuid=True), nullable=True)
    suggested_category_name = Column(String, nullable=True)
    confidence = Column(Float, nullable=False)
    
    # Client reference (optional) - frontend can use this to track state
    client_reference = Column(String, nullable=True)
    
    # Status tracking
    was_applied = Column(Boolean, default=False)  
    
    # OpenAI specifics
    model = Column(String, nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default = func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())