from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select

from models.user_model import Users as UsersModel
from schemas.users import UserCreate
from .base import Repository
from db.db import Base, AsyncSession
from .base import Repository


ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)


class RepositoryDB(Repository, Generic[ModelType, CreateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self._model = model

    async def get(self, db: AsyncSession, email: str) -> Optional[ModelType]:
        statement = select(self._model).where(self._model.email == email)
        result = await db.execute(statement=statement)
        return result.scalar_one_or_none()

    async def get_multi(
        self, db: AsyncSession, *, skip=0, limit=100
    ) -> List[ModelType]:
        statement = select(self._model).offset(skip).limit(limit)
        results = await db.execute(statement=statement)
        return results.scalars().all()

    async def create(self, db: AsyncSession, *, obj_in: CreateSchemaType) -> ModelType:
        print('--------------', obj_in)
        obj_in_data = jsonable_encoder(obj_in)
        print('1-----', obj_in_data)
        db_obj = self._model(**obj_in_data)
        print('2-----', db_obj)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def delete(
            self, db: AsyncSession, *, email: str) -> ModelType:
        statement = select(self._model).where(self._model.email == email)
        result = await db.execute(statement=statement)
        result.is_active = False
        db.add(result)
        await db.commit()
        await db.refresh(result)
        return result


class RepositoryUser(RepositoryDB[UsersModel, UserCreate]):
    pass

users_crud = RepositoryUser(UsersModel)
