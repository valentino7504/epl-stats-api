import logging
import os
import re

import requests
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class BaseScraper:
    '''Base class for shared scraper logic'''

    def __init__(self, url, output_path):
        self.url = url
        self.output_path = output_path
        self.data = self.load_data()
        self.soup = BeautifulSoup(self.data, 'html.parser')

    def fetch_data(self):
        '''Fetches data from the URL'''
        try:
            response = requests.get(self.url)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            logging.error(f'Error fetching data: {e}')
            return None

    def load_from_file(self):
        '''Load HTML content from file'''
        with open(self.output_path, 'r', encoding='utf-8') as file:
            file_data = file.read()
        return file_data

    def save_to_file(self, html):
        '''Save HTML content to file'''
        if html:
            with open(self.output_path, 'w', encoding='utf-8') as file:
                html = re.sub(r'<!--|-->', '', html)
                file.write(html)
            logger.info(f'HTML content saved to {self.output_path}')
        else:
            logger.info('No content to save')

    def load_data(self):
        '''Check if file exists; if not, scrape the data'''
        if os.path.exists(self.output_path):
            logger.info(f'{self.output_path} found. Loading from file...')
            return self.load_from_file()
        logger.info(f'{self.output_path} not found. Scraping the data...')
        html = self.fetch_data()
        os.makedirs(os.path.dirname(self.output_path), exist_ok=True)
        self.save_to_file(html)
        return html
