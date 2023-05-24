from fastapi import APIRouter
from fastapi.responses import JSONResponse

from .users import router as users_router
from .camunda import router as camunda_router
from .keycloak import router as keycloak_router
from .hh_api import router as hh_router

# Объект router, в котором регистрируем обработчики
api_router = APIRouter()
api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(camunda_router, prefix="/bpm", tags=["bpm"]) 
api_router.include_router(keycloak_router, prefix="/verify_token", tags=["verify_token"])
api_router.include_router(hh_router, prefix="/hh", tags=["hh"])


@api_router.get('/')
async def root_handler():
    return JSONResponse({'api_version': '1.0.0'})