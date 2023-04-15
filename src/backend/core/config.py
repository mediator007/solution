import os
from pydantic import BaseSettings, PostgresDsn

# Название проекта. Используется в Swagger-документации
PROJECT_HOST = os.getenv('PROJECT_HOST', '0.0.0.0')
PROJECT_PORT = int(os.getenv('PROJECT_PORT', '8000'))

# Корень проекта solution/src/backend
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class AppSettings(BaseSettings):
    app_title: str = "Solution"
    database_dsn: PostgresDsn

    class Config:
        env_file = '.env'


app_settings = AppSettings()