from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from db.db import get_session
from schemas import users as users_schema

router = APIRouter()

@router.get("/", response_model=List[users_schema.UserBase])

def read_users(
    db: AsyncSession = Depends(get_session),
    skip: int = 0,
    limit: int = 100
) -> Any:
    users = []
    return users

@router.get("/{email}", response_model=users_schema.UserBase)
def read_user(
    *,
    db: AsyncSession = Depends(get_session),
    email: str,
) -> Any:
    user = {}
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return user

@router.post(
        "/", status_code=status.HTTP_201_CREATED,
        response_model=users_schema.UserBase
        )
def create_user(
    db: AsyncSession = Depends(get_session),
    user_in=users_schema.UserCreate
) -> Any:
    user = {}
    return user

@router.delete(
        "/{email}", status_code=status.HTTP_202_ACCEPTED,
        response_model=users_schema.UserDelete
        )
def delete_user(
    *,
    db: AsyncSession = Depends(get_session),
    user_in=users_schema.UserDelete,
    email: str
) -> Any:
    """
    Switch off `is_active` field on user in DB
    """
    user = {}
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return user 