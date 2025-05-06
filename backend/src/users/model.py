from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.dialects.postgresql import UUID

# Used for user creation/registration
class UserCreate(BaseModel):   
    email: EmailStr
    password: str
    full_name: str | None = None
    
# Used for authentication
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
class UserResponse(BaseModel):
    user_id: UUID
    email: EmailStr
    full_name: str | None = None
    
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True 
    
    