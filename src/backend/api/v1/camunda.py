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
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://158.160.29.162:8080/engine-rest/task?processDefinitionKey=sovkombank"
        )
        response = json.loads(response.__getattribute__('_content').decode())
        resumes = {'first': list(), 'second': list(), 'third': list()}
        for r in response:
            try:
                execution_id = r['executionId']
                res = await client.get(
                    f"http://158.160.29.162:8080/engine-rest/process-instance/{execution_id}/variables"
                )
                res = json.loads(res.__getattribute__('_content').decode())
                candidate = {
                    'id': execution_id, 
                    'name': res['name']['value'],
                    'phone': res['phone']['value'], 
                    'description': res['description']['value'],
                    'photo': res['photo']['value'],
                    }
                if r['name'] == 'hr_interview':
                    resumes['first'].append(candidate)
                elif r['name'] == 'manager_look':
                    resumes['second'].append(candidate)
                elif r['name'] == 'agreement':
                    resumes['third'].append(candidate)
                
            except Exception as e:
                print(execution_id, e)
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
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://158.160.29.162:8080/engine-rest/process-definition/key/sovkombank/start",
            json=request
        )
    response = json.loads(response.__getattribute__('_content').decode())


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