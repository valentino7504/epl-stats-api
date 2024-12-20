'''

the club model

'''

from sqlalchemy import Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base_model import BaseModel


class Club(BaseModel):
    '''the club model'''

    __tablename__ = 'clubs'
    name: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    founded: Mapped[int] = mapped_column(Integer, nullable=False)
    players = relationship('Player', back_populates='club')
    city: Mapped[str] = mapped_column(String, nullable=True)
    position: Mapped[int] = mapped_column(Integer, nullable=False)
    matches_played: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0
    )
    wins: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    draws: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    losses: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    goal_difference: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0
    )
    goals_scored: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0
    )
    goals_conceded: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0
    )
    points: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    ppg: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    xG: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    xGA: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    xGD: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    xGDp90: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    xGp90: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    last_five: Mapped[str] = mapped_column(String, nullable=True, default='')
    attendance_per_game: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0
    )
    possession: Mapped[float] = mapped_column(Float, nullable=True)
    prgC: Mapped[int] = mapped_column(Integer, default=0, nullable=True)
    prgP: Mapped[int] = mapped_column(Integer, default=0, nullable=True)
    no_players: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    average_age: Mapped[float] = mapped_column(
        Float, default=0.0, nullable=False
    )
    stadium: Mapped[str] = mapped_column(String, nullable=True)
    nickname: Mapped[str] = mapped_column(String, nullable=True)
    stadium_capacity: Mapped[int] = mapped_column(Integer, nullable=True)
    manager: Mapped[str] = mapped_column(String, nullable=True)

    def to_dict(self, include: list = None, exclude: list = None):
        '''to_dict method'''
        data = {
            col.name: getattr(self, col.name) for col in self.__table__.columns
        }
        if include:
            data = {key: data[key] for key in include if key in data}
        if exclude:
            for key in exclude:
                data.pop(key, None)
        return data
