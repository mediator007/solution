from core.config import app_settings
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

# Создаём базовый класс для будущих моделей
Base = declarative_base()
# Создаём движок
# Настройки подключения к БД передаём из переменных окружения, которые заранее загружены в файл настроек
# Указание echo=True при инициализации движка позволит увидеть сгенерированные SQL-запросы в консоли.
"""
Для работы с SQLAlchemy нужны сессии. 
Для асинхронной работы они создаются при помощи класса AsyncSession. 
Как и при создании обычной сессии, в класс AsyncSession передаётся объект engine. 
Вызов AsyncSession(engine) создаёт только один объект сессии, а для работы асинхронного приложения 
потребуется постоянно открывать и закрывать их: для каждого запроса — своя сессия. 
Чтобы множественно создавать сессии, применим функцию sessionmaker() из модуля sqlalchemy.orm. 
В дальнейшем будем использовать её для добавления новых сессий в наши маршруты с помощью системы 
зависимостей (Dependency Injection) в FastAPI.
"""
engine = create_async_engine(app_settings.database_dsn, echo=True, future=True)
async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Функция понадобится при внедрении зависимостей
# Dependency
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session 