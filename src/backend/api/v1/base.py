from fastapi import APIRouter
from fastapi.responses import JSONResponse

from .users import router as users_router
from .camunda import router as camunda_router

# Объект router, в котором регистрируем обработчики
api_router = APIRouter()
api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(camunda_router, prefix="/bpm", tags=["bpm"]) 



@api_router.get('/')
async def root_handler():
    return JSONResponse({'api_version': '1.0.0'})