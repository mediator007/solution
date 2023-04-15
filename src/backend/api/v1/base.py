from fastapi import APIRouter
from fastapi.responses import JSONResponse

from .users import router as users_router

# Объект router, в котором регистрируем обработчики
api_router = APIRouter()
api_router.include_router(users_router, prefix="/users", tags=["users"]) 



@api_router.get('/')
async def root_handler():
    return JSONResponse({'api_version': '1.0.0'})