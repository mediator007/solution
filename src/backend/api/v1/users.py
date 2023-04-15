from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from db.db import get_session

router = APIRouter()

@router.get("/")

def read_users(
    db: AsyncSession = Depends(get_session),
    skip: int = 0,
    limit: int = 100
) -> Any:
    users = []
    return users

@router.get("/{email}")
def read_user(
    *,
    db: AsyncSession = Depends(get_session),
    email: str,
) -> Any:
    user = {}
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return user

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(
    db: AsyncSession = Depends(get_session),
) -> Any:
    user = {}
    return user

@router.delete("/{email}")
def delete_user(
    *,
    db: AsyncSession = Depends(get_session),
    email: str
) -> Any:
    """
    Switch off `is_active` field on user in DB
    """
    user = {}
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return user 