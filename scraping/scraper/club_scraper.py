import logging
import os
from io import StringIO

import pandas as pd

from config import Config
from scraper.base_scraper import BaseScraper
from utils import CLUBS_COLUMN_MAPPING, format_column

# Setup logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Constants
CLUB_DATA_DIR = 'club_data'
HTML_FILE_NAME = 'index.html'
JSON_FILE_NAME = 'extra_club_data.json'
STATS_ID = 'stats_squads_standard_for'
UNNAMED_PREFIX = 'Unnamed'


def extract_scorer(scorer_line: str) -> str:
    '''Extract the scorer name from a string.'''
    split = scorer_line.split(',')
    if len(split) > 1:
        return split[0].strip()
    return scorer_line.split(' -')[0].strip()


class ClubScraper(BaseScraper):
    '''DataScraper to extract and merge club data.'''

    def __init__(self) -> None:
        '''Initialize the FBRef scraper for club data.'''
        script_dir = os.path.dirname(os.path.abspath(__file__))
        output_path = os.path.join(script_dir, CLUB_DATA_DIR, HTML_FILE_NAME)
        self.json_path = os.path.join(
            script_dir, CLUB_DATA_DIR, JSON_FILE_NAME
        )
        super().__init__(Config.PL_CLUB_DATA_URL, output_path)

    def __get_standard_club_stats(self) -> pd.DataFrame:
        '''Extract the standard stats.'''
        standard_stats = self.soup.find(id=STATS_ID)
        df = pd.read_html(StringIO(str(standard_stats)))[0]
        new_columns = [
            (
                ('Squad Details', level1)
                if UNNAMED_PREFIX in level0
                else (level0, level1)
            )
            for level0, level1 in df.columns
        ]
        df.columns = pd.MultiIndex.from_tuples(new_columns)
        _, p90, perf, _, prog, sd = df.columns.levels[0]
        df = df.loc[
            :,
            (
                [prog, p90, sd, perf],
                ['Squad', 'Poss', 'PrgC', 'PrgP', '# Pl', 'Age', 'xG', 'PK'],
            ),
        ]
        df.columns = df.columns.droplevel(0)
        df.rename(columns={'xG': 'xGp90'}, inplace=True)
        return df

    def __get_main_club_stats(self) -> pd.DataFrame:
        '''Extract the main stats.'''
        df = pd.read_html(StringIO(str(self.soup)))[0]
        df.drop(columns='Notes', inplace=True)
        return df

    def __get_extra_data(self) -> pd.DataFrame:
        '''Get extra club data not available on the site.'''
        df = pd.read_json(self.json_path).T
        df.reset_index(inplace=True)
        df.rename(columns={'index': 'Squad'}, inplace=True)
        return df

    def to_dict(self, as_df: bool = False):
        '''Merge club data from multiple sources.'''
        main_stats = self.__get_main_club_stats()
        standard_stats = self.__get_standard_club_stats()
        extra_data = self.__get_extra_data()

        df = pd.merge(main_stats, standard_stats, on='Squad', how='outer')
        df.replace('Nott\'ham Forest', 'Nottingham Forest', inplace=True)
        df = pd.merge(extra_data, df, on='Squad', how='outer')

        df.rename(columns={'Top Team Scorer': 'Top Scorer'}, inplace=True)
        df['Top Scorer'] = df['Top Scorer'].apply(extract_scorer)
        df['Goalkeeper'] = df['Goalkeeper'].apply(lambda x: x.split(',')[0])
        df.columns = map(format_column, df.columns)
        df.rename(columns=CLUBS_COLUMN_MAPPING, inplace=True)
        df.drop(['goalkeeper', 'pk'], axis=1, inplace=True)
        if as_df:
            return df
        return df.to_dict('records')
