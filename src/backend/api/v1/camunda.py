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
            {'name': 'Петров Виктор', 'phone': '8 911 999 99 82', 'description': 'Python, JS'}, 
            {'name': 'Иванов Петр', 'phone': '8 911 999 99 82', 'description': 'C#'},
        ],
        'second': [
            {'name': 'Степанов Аркадий', 'description': 'Python, C++'},
        ],
        'third': [
            {'name': 'Смирнова Мария', 'phone': '8 911 999 99 82', 'description': 'Go, JS'},
        ]
    }
    return resumes

@router.post("/start_process")
async def start_process(data: dict) -> Any:
    data = json.loads(data['data'])
    candidate_to_move = data['to_move']
    request = {
        "variables":
            {
                "name" : {"value" : candidate_to_move['name'], "type": "String"},
                "phone" : {"value" : candidate_to_move['phone'], "type": "String"},
                "description" : {"value" : candidate_to_move['description'], "type": "String"},
                "photo" : {"value" : candidate_to_move['photo'], "type": "String"}
            },
        "businessKey" : "HR_Business_Key"
        }
    response = httpx.post(
        "http://158.160.29.162:8080/engine-rest/process-definition/key/sovkombank/start",
        json=request
        )
    print('---------', response)


@router.post("/move_candidate")
async def move_candidate(data: dict) -> Any:
    data = json.loads(data['data'])
    resumes = data['resumes']
    candidate_to_move = data['to_move']

    # Заглушка, двигаем кандидатов вперед по воронке
    to_next_step = None
    for key, value in resumes.items():
        if to_next_step:
            resumes[key].append(to_next_step)
            return resumes
        for index, el in enumerate(value):
            if candidate_to_move['name'] == el['name']:
                to_next_step = resumes[key].pop(index)
                break
    
    return resumes