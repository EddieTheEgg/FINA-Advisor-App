


from enum import Enum
import uuid
from sqlalchemy import JSON, UUID, Column, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship

from backend.src.database.core import Base
from backend.src.entities.enums import AuditAction

# Audit logs used to track changes like updates, deletes, etc.
class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    audit_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), index=True)
    action = Column(Enum(AuditAction, name='audit_action'), nullable=False)
    record_id = Column(UUID(as_uuid=True), nullable=False)
    old_data = Column(JSON, nullable=True)
    new_data = Column(JSON, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    #Relationships
    user = relationship("User", back_populates="audit_logs")
    
    