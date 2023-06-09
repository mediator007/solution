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
    bpm = os.environ.get('BPM_HOST')
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"http://{bpm}:8080/engine-rest/task?processDefinitionKey=sovkombank"
        )
        response = json.loads(response.__getattribute__('_content').decode())
        resumes = {'first': list(), 'second': list(), 'third': list()}
        for r in response:
            print(r['name'])
            try:
                execution_id = r['executionId']
                res = await client.get(
                    f"http://{bpm}:8080/engine-rest/process-instance/{execution_id}/variables"
                )
                res = json.loads(res.__getattribute__('_content').decode())
                candidate = {
                    'id': r['id'], 
                    'name': res['name']['value'],
                    'phone': res['phone']['value'], 
                    'description': res['description']['value'],
                    'photo': res['photo']['value'],
                    }
                if r['name'] == 'hr_interview':
                    resumes['first'].append(candidate)
                elif r['name'] == 'manager_look':
                    resumes['second'].append(candidate)
                elif r['name'] == 'manager_interviw':
                    resumes['third'].append(candidate)
                
            except Exception as e:
                print(execution_id, e)
    return resumes

@router.post("/start_process")
async def start_process(data: dict) -> Any:
    bpm = os.environ.get('BPM_HOST')
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
            f"http://{bpm}:8080/engine-rest/process-definition/key/sovkombank/start",
            json=request
        )
    response = json.loads(response.__getattribute__('_content').decode())


@router.post("/move_candidate")
async def move_candidate(data: dict) -> Any:
    bpm = os.environ.get('BPM_HOST')
    data = json.loads(data['data'])
    resumes = data['resumes']
    candidate_to_move = data['to_move']
    data = {
        "variables": {
            "returnTask":{"value": False}, 
            "endProcess":{"value": False}
            }
        }
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"http://{bpm}:8080/engine-rest/task/{candidate_to_move['id']}/complete",
            json=data
        )
    
    return resumes