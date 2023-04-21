from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    is_active: bool


class UserCreate(UserBase):
    hashed_password: str
    created_at: datetime


class UserDelete(UserBase):
    pass


class UserInDBBase(UserBase):
    hashed_password: str
    created_at: datetime

    class Config:
        orm_mode = True
