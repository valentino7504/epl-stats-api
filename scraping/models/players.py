#!/usr/bin/env python3
'''
The player module
'''
from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base_model import BaseModel


class Player(BaseModel):
    '''The player model'''

    __tablename__ = 'players'
    __table_args__ = (UniqueConstraint('name', 'club_id'),)
    name: Mapped[str] = mapped_column(String, nullable=False)
    club_id: Mapped[int] = mapped_column(ForeignKey('clubs.id'))
    club = relationship('Club', back_populates='players')
    nationality: Mapped[str] = mapped_column(String, nullable=False)
    position: Mapped[str] = mapped_column(String, nullable=False)
    birth_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    matches_played: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0
    )
    yellow_cards: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0
    )
    red_cards: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    starts: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    full_90s: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    minutes: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    goals: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    assists: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    non_penalty_goals: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0
    )
    xG: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    npxG: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    xAG: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    prgC: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    prgP: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    goals_p90: Mapped[float] = mapped_column(
        Float, nullable=False, default=0.0
    )
    assists_p90: Mapped[float] = mapped_column(
        Float, nullable=False, default=0.0
    )
    xG_p90: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    xAG_p90: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    tackles: Mapped[int] = mapped_column(Integer, nullable=True, default=None)
    saves: Mapped[int] = mapped_column(Integer, nullable=True, default=None)
    clean_sheets: Mapped[int] = mapped_column(
        Integer, nullable=True, default=None
    )
    interceptions: Mapped[int] = mapped_column(
        Integer, nullable=True, default=None
    )
    blocks: Mapped[int] = mapped_column(Integer, nullable=True, default=None)
    save_percent: Mapped[float] = mapped_column(
        Float, nullable=True, default=None
    )
    clearances: Mapped[int] = mapped_column(
        Integer, nullable=True, default=None
    )
    is_captain: Mapped[bool] = mapped_column(
        Boolean, nullable=True, default=None
    )

    def to_dict(self, include: list = None, exclude: list = None):
        '''to_dict'''
        data = {
            col.name: getattr(self, col.name) for col in self.__table__.columns
        }
        if include:
            data = {key: data[key] for key in include if key in data}
        if exclude:
            for key in exclude:
                data.pop(key, None)
        return data
