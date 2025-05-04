from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator
from sqlalchemy import UUID

# Used for user creation/registration
class UserCreate(BaseModel):   
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    
    
# Used for authentication
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
class UserResponse(BaseModel):
    user_id: UUID
    email: EmailStr
    full_name: Optional[str] = None
    
    class Config:
        orm_mode = True
    
    