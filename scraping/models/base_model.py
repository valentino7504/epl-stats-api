#!/usr/bin/env python3
'''
Module for the base model
'''
from datetime import datetime

from sqlalchemy import DateTime, Integer, func
from sqlalchemy.orm import Mapped, mapped_column

from db import Base


class BaseModel(Base):
    '''The base model'''

    __abstract__ = True
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=func.now(), onupdate=func.now()
    )

    # def __repr__(self) -> str:
    #     '''define class representation of model'''
    #     raise NotImplementedError
