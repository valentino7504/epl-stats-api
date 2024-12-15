#!/usr/bin/env python3
'''The db.py module for initialising the database'''
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

from config import Config

Base = declarative_base()
config = Config()


class DB:
    '''The DB class'''

    def __init__(self) -> None:
        '''dunder init method'''
        self._engine = create_engine(config.DB_STRING, echo=False)
        self.create_all()
        self._session = None

    @property
    def session(self) -> Session:
        '''gets a session'''
        if self._session is None:
            DBSession = sessionmaker(self._engine)
            self._session = DBSession()
        return self._session

    def close_session(self) -> None:
        '''closes a session'''
        if self.session:
            self.session.close()
        self._session = None

    def create_all(self) -> None:
        '''creates all tables'''
        Base.metadata.create_all(self._engine)

    def drop_all(self) -> None:
        '''deletes all tables'''
        Base.metadata.drop_all(self._engine)

    def add(self, item) -> None:
        '''adds to session'''
        self.session.add(item)

    def commit(self) -> None:
        '''commits changes'''
        self.session.commit()

    def __enter__(self):
        '''context manager'''
        return self.session

    def __exit__(self):
        '''exit context manager'''
        self.close_session()


if __name__ == "__main__":
    db = DB()
