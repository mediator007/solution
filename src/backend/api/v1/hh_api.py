from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from db.db import get_session
from schemas import users as users_schema
from services.users_crud import users_crud

router = APIRouter()

@router.get("/callbacks", response_model=List)
async def callbacks() -> Any:
    # HTTPX request to hh API
    resumes = [
        {'name': 'Qwerty Qwertyuytre'}, 
        {'name': 'Йцукен Йцукенович'}, 
        {'name': 'IUyiuyjh jjhjhjhsDS'}
        ]
    # rate resumes
    resumes = [
        {'name': 'Пупкин Виктор', 'rating': 99}, 
        {'name': 'Андреева Ольга', 'rating': 76},
        ]
    return resumes
