from datetime import datetime

import sqlalchemy as sa
from sqlalchemy_utils import EmailType

# Импортируем базовый класс для моделей.
from db.db import Base

association_table = sa.Table(
    "role_model",
    Base.metadata,
    sa.Column("user_email", sa.ForeignKey("users.email")),
    sa.Column("role_name", sa.ForeignKey("roles.role_name")),
)

class Users(Base):
    __tablename__ = 'users'
    email = sa.Column(EmailType, primary_key=True)
    hashed_password = sa.Column(sa.String)
    created_at = sa.Column(sa.DateTime, index=True, default=datetime.utcnow)
    is_active = sa.Column(sa.Boolean)


class Roles(Base):
    __tablename__ = 'roles'
    role_name = sa.Column(sa.String, primary_key=True)