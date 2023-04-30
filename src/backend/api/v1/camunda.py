import os
from typing import Any
import json

from fastapi import APIRouter
import httpx

router = APIRouter()

BPM_HOST = f"http://{os.getenv('BPM_HOST')}:8080/engine-rest"

@router.get("/")
async def read_bpm_users() -> Any:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BPM_HOST}/user")
    users = json.dumps((response.content).decode())
    return users