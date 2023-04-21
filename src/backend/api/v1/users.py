from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from db.db import get_session
from schemas import users as users_schema
from services.users_crud import users_crud

router = APIRouter()


@router.get("/", response_model=List[users_schema.User])
async def read_users(
    db: AsyncSession = Depends(get_session),
    skip: int = 0,
    limit: int = 100
) -> Any:
    users = await users_crud.get_multi(db, skip=skip, limit=limit)
    return users


@router.get("/{email}", response_model=users_schema.User)
async def read_user(
    *,
    db: AsyncSession = Depends(get_session),
    email: str,
) -> Any:
    user = await users_crud.get(db, email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return user


@router.post(
        "/", status_code=status.HTTP_201_CREATED,
        response_model=users_schema.User,
        )
async def create_user(
    user_in: users_schema.UserCreate,
    db: AsyncSession = Depends(get_session),
) -> Any:
    user = await users_crud.create(db, obj_in=user_in)
    return user


@router.delete(
        "/{email}", status_code=status.HTTP_202_ACCEPTED,
        response_model=users_schema.User
        )
async def delete_user(
    *,
    db: AsyncSession = Depends(get_session),
    email: str
) -> Any:
    """
    Switch off `is_active` field on user in DB
    """
    user = await users_crud.delete(db, email=email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return user 