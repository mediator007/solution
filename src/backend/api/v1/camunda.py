import os
from typing import Any
import json
from typing import Any, List, Dict

from fastapi import APIRouter
import httpx

router = APIRouter()

@router.get("/")
async def read_bpm_users() -> Any:
    bpm = os.environ.get('BPM_HOST')
    async with httpx.AsyncClient() as client:
        response = await client.get(f"http://{bpm}:8080/engine-rest/user")
    users = json.dumps((response.content).decode())
    return users


@router.get("/all_candidates_in_process", response_model=Dict[str, List])
async def all_candidates_in_process() -> Any:
    # rate resumes
    resumes = {
        'first': [
            {'name': 'Qwerty Qwertyuytre', 'rating': 99}, 
            {'name': 'Йцукен Йцукенович', 'rating': 76},
        ],
        'second': [
            {'name': 'Peter Johnson', 'rating': 76},
        ],
        'third': [
            {'name': 'John Peterson', 'rating': 23},
        ]
    }
    return resumes


@router.post("/move_candidate")
async def move_candidate(data: dict) -> Any:
    candidate_to_move = json.loads(data['data'])
    print(candidate_to_move)
    resumes = {
        'first': [
            {'name': 'Qwerty Qwertyuytre', 'rating': 99}, 
            {'name': 'Йцукен Йцукенович', 'rating': 76},
        ],
        'second': [
            {'name': 'Peter Johnson', 'rating': 76},
        ],
        'third': [
            {'name': 'John Peterson', 'rating': 23},
        ]
    }
    return resumes