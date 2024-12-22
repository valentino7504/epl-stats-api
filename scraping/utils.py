from copy import deepcopy
from datetime import datetime, timedelta
from math import isnan

from sqlalchemy.dialects.postgresql import insert

from db import DBSession
from models.clubs import Club
from models.players import Player
from scraper.column_mappers import column_maps


def format_column(column_name: str) -> str:
    '''formats a column'''
    new_name = column_name.lower()
    new_name = new_name.replace('/', 'p')
    new_name = new_name.replace(' ', '_')
    return new_name


def upsert_club(club_dict: dict):
    '''creates a club from a dictionary'''
    create_dict = deepcopy(club_dict)
    create_dict.pop('top_scorer')
    create_dict.pop('captain')
    stmt = insert(Club).values(**create_dict)
    set_ = {
        col: stmt.excluded[col]
        for col in create_dict.keys()
        if col not in ['name', 'founded', 'city']
    }
    set_['updated_at'] = datetime.now()
    stmt = stmt.on_conflict_do_update(index_elements=['name'], set_=set_)
    return stmt


def upsert_player(db_session: DBSession, player_data: dict):
    '''upserts a player'''
    club_name = player_data['squad']
    club = db_session.session.query(Club).filter_by(name=club_name).first()
    if not club:
        raise ValueError(f'No club named {club_name}')
    player_data['club_id'] = club.id
    player_data.pop('squad')
    age = player_data['age']
    player_data.pop('age')
    years, days = age.split('-')
    years, days = int(years), int(days)
    current_date = datetime.now()
    dob_y_sub = current_date.replace(year=current_date.year - years)
    dob = dob_y_sub - timedelta(days=days)
    player_data['birth_date'] = dob
    for key, value in player_data.items():
        if isinstance(value, float) and isnan(value):
            player_data[key] = None
    stmt = insert(Player).values(**player_data)
    set_ = {
        col: stmt.excluded[col]
        for col in player_data.keys()
        if col not in ['name', 'club_id', 'birth_date']
    }
    set_['updated_at'] = datetime.now()
    stmt = stmt.on_conflict_do_update(
        index_elements=['name', 'club_id'], set_=set_
    )
    return stmt


NEEDED_COLUMNS, CLUBS_COLUMN_MAPPING, PLAYERS_COLUMN_MAPPING = column_maps
