from fastapi import APIRouter
from fastapi.responses import JSONResponse

# Объект router, в котором регистрируем обработчики
router = APIRouter()

@router.get('/')
async def root_handler():
    return JSONResponse({'version': 'v1'})