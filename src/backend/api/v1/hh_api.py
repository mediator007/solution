from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from db.db import get_session
from schemas import users as users_schema
from services.users_crud import users_crud

router = APIRouter()

@router.get("/callbacks", response_model=List)
async def callbacks() -> Any:
    # rate resumes
    resumes = [
        {   
            'rating': 99, 
            'name': 'Пупкин Виктор', 
            'phone': '8 911 999 99 82', 
            'description': 'Python, JS',
            'photo': "https://www.kampai.de/wp-content/uploads/2017/08/profilbild.jpg"
            }, 
        {
            'name': 'Андреева Ольга', 'rating': 76, 
            'phone': '8 911 999 99 82', 
            'description': 'C++, Go',
            "photo": "https://www.snapigram.com/upload/photos/2020/07/3b4SVyiQWo8UboEvzIxn_30_32cde4ff4fc04ab019528660bcd5bf9f_avatar_full.png"
            },
        {
            'name': 'Петрова Светлана', 'rating': 76, 
            'phone': '8 911 322 11 82', 
            'description': 'VBA',
            "photo": "https://www.kirilltigai.com/wp-content/uploads/Delovaya-fotosessiya-v-Kieve-fotograf-Kirill-Tigaj_7-800x600.jpg"
            },
        {
            'name': 'Сергеев Сергей', 'rating': 76, 
            'phone': '8 918 955 99 82', 
            'description': '1C, Rust',
            "photo": "https://freead1.net/uploads/2022/46/company_incorporation_service_in_oman_02d99_1.jpg"
            },
        ]
    return resumes
