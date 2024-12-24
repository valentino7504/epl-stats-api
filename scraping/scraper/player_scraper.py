import logging
import os
import re
from io import StringIO

import pandas as pd
import requests
from bs4 import BeautifulSoup

from config import Config
from scraper.base_scraper import BaseScraper
from scraper.club_scraper import ClubScraper
from utils import NEEDED_COLUMNS, PLAYERS_COLUMN_MAPPING, format_column

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

cs = ClubScraper().to_dict(True)


class PlayerScraper(BaseScraper):
    '''Scraper to retrieve player data.'''

    def __init__(self):
        self.__script_dir = os.path.dirname(os.path.abspath(__file__))
        output_path = os.path.join(
            self.__script_dir, 'player_data', 'index.html'
        )
        url = Config.PL_PLAYER_DATA_URL
        super().__init__(url, output_path)

    def __fetch_html(self, url, path):
        '''Fetches and saves HTML content if not already present.'''
        if not os.path.exists(path):
            response = requests.get(url)
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, 'w', encoding='utf-8') as file:
                file.write(re.sub(r'<!--|-->', '', response.text))
                logger.info(f'Fetched data from {url}')
        with open(path, 'r', encoding='utf-8') as file:
            return file.read()

    def __parse_table(self, html, table_id):
        '''Parses a table from HTML and processes its columns.'''
        soup = BeautifulSoup(html, 'html.parser').select_one(
            f'table#{table_id}'
        )
        extra_rows = soup.select('tr.thead')
        for row in extra_rows:
            row.decompose()
        df = pd.read_html(StringIO(str(soup)))[0]
        columns = [
            (col[0] if 'Unnamed' not in col[0] else 'Player Details', col[1])
            for col in df.columns
        ]
        df.columns = pd.MultiIndex.from_tuples(columns)
        return df

    def __std_player_stats(self):
        '''Extracts standard player stats.'''
        html = self.__fetch_html(
            Config.PL_PLAYER_DATA_URL,
            os.path.join(self.__script_dir, 'player_data', 'index.html'),
        )
        df = self.__parse_table(html, 'stats_standard')
        df = df[NEEDED_COLUMNS]
        df.columns = [
            (col[1] + 'p90' if col[0] == 'Per 90 Minutes' else col[1])
            for col in df.columns
        ]
        df['Nation'] = df['Nation'].apply(lambda x: x.split()[-1])
        return df

    def __def_data(self):
        '''Retrieves defensive data.'''
        html = self.__fetch_html(
            Config.PL_DEF_URL,
            os.path.join(self.__script_dir, 'player_data', 'def.html'),
        )
        df = self.__parse_table(html, 'stats_defense')
        df = df[
            [
                ('Player Details', 'Player'),
                ('Player Details', 'Squad'),
                ('Player Details', 'Int'),
                ('Player Details', 'Clr'),
                ('Tackles', 'Tkl'),
                ('Blocks', 'Blocks'),
            ]
        ]
        df.columns = [col[1] for col in df.columns]
        return df

    def __gk_data(self):
        '''Retrieves goalkeeper data.'''
        html = self.__fetch_html(
            Config.PL_GK_URL,
            os.path.join(self.__script_dir, 'player_data', 'gk.html'),
        )
        df = self.__parse_table(html, 'stats_keeper')
        df = df[
            [
                ('Player Details', 'Player'),
                ('Player Details', 'Squad'),
                ('Performance', 'CS'),
                ('Performance', 'Saves'),
                ('Performance', 'Save%'),
            ]
        ]
        df.columns = [col[1] for col in df.columns]
        return df

    def to_dict(self):
        '''Merges standard, defensive, and goalkeeper data.'''
        standard_data = self.__std_player_stats()
        def_data = self.__def_data()
        gk_data = self.__gk_data()

        data = pd.merge(
            standard_data, gk_data, on=['Player', 'Squad'], how='outer'
        )
        data = pd.merge(data, def_data, on=['Player', 'Squad'], how='outer')

        data.replace('Nott\'ham Forest', 'Nottingham Forest', inplace=True)
        data.drop('Rk', axis=1, inplace=True, errors='ignore')
        data.columns = map(format_column, data.columns)
        data['is_captain'] = data['player'].isin(cs['captain'])
        data.rename(columns=PLAYERS_COLUMN_MAPPING, inplace=True)
        return data.to_dict('records')
