from db import DBSession
from scraper.club_scraper import ClubScraper
from scraper.player_scraper import PlayerScraper
from utils import upsert_club, upsert_player

db = DBSession()
club_scraper = ClubScraper()
club_data = club_scraper.to_dict()
for club in club_data:
    stmt = upsert_club(club)
    db.execute(stmt)
db.commit()

player_scraper = PlayerScraper()
player_data = player_scraper.to_dict()
for player in player_data:
    stmt = upsert_player(db, player)
    db.execute(stmt)
db.commit()
