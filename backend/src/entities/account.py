import uuid
from sqlalchemy import Boolean, Column, DateTime, Float, String, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.src.database.core import Base
from backend.src.entities.enums import AccountType


class Account(Base):
    __tablename__ = "accounts"
    
    account_id = Column(UUID(as_uuid=True), primary_key = True, default = uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), index=True)
    
    #Core account information
    name = Column(String, nullable=False)
    account_type = Column(Enum(AccountType, name='accounttype'), nullable=False, default=AccountType.CHECKING)
    balance = Column(Float, nullable = False, default = 0)
    
    #Optional bank details
    bank_name = Column(String, nullable=True)
    account_number = Column(String, nullable=True)
    routing_number = Column(String, nullable=True)
    
    #Account settings
    is_default = Column(Boolean, nullable=False, default=False)
    include_in_totals = Column(Boolean, nullable=False, default=True)
    is_active = Column(Boolean, nullable=False, default=True)
    
    #Display for account (color theme)
    color = Column(String, nullable=False)
    icon = Column(String, nullable=False)
    
    #Timestamps
    created_at = Column(DateTime(timezone=True), server_default = func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="accounts")
    transactions = relationship("Transaction",
        back_populates="account",
        foreign_keys="[Transaction.account_id]",
        cascade="all, delete-orphan"
    )
    transfers = relationship(
        "Transaction",
        back_populates="to_account",
        foreign_keys="[Transaction.to_account_id]"
    )
    monthly_snapshots = relationship("MonthlySnapshot", back_populates="account", cascade="all, delete-orphan")
    
    