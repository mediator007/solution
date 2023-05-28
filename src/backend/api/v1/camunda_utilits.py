import os
from typing import Any
import json
from typing import Any, List, Dict

from fastapi import APIRouter
import httpx

async def get_candidates_in_stages(client, r, stage_list: list):
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
    stage_list.append(candidate)