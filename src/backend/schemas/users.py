from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    hashed_password: str
    is_active: bool


class UserDelete(UserBase):
    pass


class UserInDBBase(UserBase):
    hashed_password: str
    created_at: datetime
    is_active: bool

    class Config:
        orm_mode = True


class User(UserInDBBase):
    email: str
    is_active: bool
