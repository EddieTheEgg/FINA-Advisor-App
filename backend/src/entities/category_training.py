# models/categorization_training.py

from enum import Enum
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from backend.src.database import Base

class CategorizationSource(str, Enum):
    OPENAI = "openai"
    USER = "user"
    PYTORCH = "pytorch"

class CategorizationTrainingData(Base):
    __tablename__ = "training_categorization_records"

    record_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    user_reference = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    transaction_reference = Column(UUID(as_uuid=True), ForeignKey("transactions.transaction_id"), nullable=False)
    category_reference = Column(UUID(as_uuid=True), ForeignKey("categories.category_id"), nullable=True)

    source_method = Column(CategorizationSource, nullable=False)
    category_confidence = Column(Float, nullable=True)
    user_confirmed = Column(Boolean, default=False)
    alt_category_suggestion = Column(String, nullable=True)  # For suggested custom categories

    created_timestamp = Column(DateTime, default=datetime.utcnow)
