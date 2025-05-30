from uuid import UUID
from pydantic import BaseModel, EmailStr

#Fields that are required upon registering a new user
class RegisterUserRequest(BaseModel):
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    password: str
    
class NewRegisteredUserResponse(BaseModel):
    user_id: UUID
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True 
    
#The token itself that we return and use between server and client
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    
#When verifies a token, we return the token along with this data
class TokenData(BaseModel):
    user_id: str | None = None
    
    def get_uuid(self) -> UUID | None:
        if self.user_id:
            return UUID(self.user_id)
        return None

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    


    
    
    
    
    
    
    