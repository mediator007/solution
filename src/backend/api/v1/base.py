from fastapi import APIRouter

# Объект router, в котором регистрируем обработчики
router = APIRouter()

@router.get('/')
async def root_handler():
    return {'version': 'v1'}