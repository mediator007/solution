import os

import uvicorn
from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from core import config
from api.v1 import base

load_dotenv()

app = FastAPI(
    # Конфигурируем название проекта. Оно будет отображаться в документации
    title=config.app_settings.app_title,
    # Адрес документации в красивом интерфейсе
    docs_url='/api/openapi',
    # Адрес документации в формате OpenAPI
    openapi_url='/api/openapi.json',
    # Можно сразу сделать небольшую оптимизацию сервиса 
    # и заменить стандартный JSON-сериализатор на более шуструю версию, написанную на Rust
    default_response_class=ORJSONResponse,
)

host = os.environ.get('HOST')
origins = [
    f"http://localhost:3000",
    f"http://localhost:8000",
    f"http://localhost:80",
    f"http://localhost:3080",    
    f"http://localhost",
    f"http://{host}:80",
    f"http://{host}"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутер к серверу, указав префикс /v1
app.include_router(base.api_router, prefix='/api/v1')

if __name__ == '__main__':
    # Приложение может запускаться командой
    # `uvicorn main:app --host 0.0.0.0 --port 8080`
    # но чтобы не терять возможность использовать дебагер,
    # запустим uvicorn сервер через python
    uvicorn.run(
        'main:app',
        host=config.PROJECT_HOST,
        port=config.PROJECT_PORT,
    ) 