import uuid
from sqlalchemy import Boolean, Column, DateTime, Float, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.src.database.core import Base


class Account(Base):
    __tablename__ = "accounts"
    
    account_id = Column(UUID(as_uuid=True), primary_key = True, default = uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.user_id'), nullable=False, index=True)
    
    #Core account information
    name = Column(String, nullable=False)
    account_type = Column(String, nullable = False, default ='checking')
    balance = Column(Float, nullable = False, default = 0)
    
    #Optional bank details
    institution_name = Column(String, nullable=False)
    account_number_last4 = Column(String, nullable=False, default='checking') #Won't ask user for full card, just last 4 in case they want more identification
    
    #Account settings
    is_active = Column(Boolean, nullable=False, default=True)
    is_default = Column(Boolean, nullable=False, default=False)
    include_in_totals = Column(Boolean, nullable=False, default=True)
    
        #Display for account (color theme)
    color = Column(String, nullable=False)
    
    #Timestamps
    created_at = Column(DateTime(timezone=True), server_default = func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account", cascade="all, delete-orphan")
    
    