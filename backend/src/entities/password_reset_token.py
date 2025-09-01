from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
    
from backend.src.database.core import Base

class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    token_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    token = Column(String, unique=True, nullable=False, index=True)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    used_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    user = relationship("User", back_populates="password_reset_tokens")
    
    def __repr__(self):
        return (f"<PasswordResetToken(token_id={self.token_id}, "
                f"user_id={self.user_id}, "
                f"expires_at='{self.expires_at}', "
                f"used_at='{self.used_at}')>")
