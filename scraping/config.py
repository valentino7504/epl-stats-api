#!/usr/bin/env python3
'''

Config module for DB URL

'''
import os


class Config:
    '''Config class'''

    DB_USER = os.environ.get('DB_USER')
    DB_PASSWORD = os.environ.get('DB_PASSWORD')
    DB_HOST = os.environ.get('DB_HOST')
    DB_PORT = os.environ.get('DB_PORT')
    DB_NAME = os.environ.get('DB_NAME')

    def __init__(self):
        '''dunder init'''
        self.DB_STRING = self.db_string()

    @classmethod
    def db_string(cls) -> str:
        '''returns the connection string'''
        env_vars = [
            cls.DB_USER,
            cls.DB_PASSWORD,
            cls.DB_HOST,
            cls.DB_PORT,
            cls.DB_NAME,
        ]
        if not all(env_vars):
            raise ValueError('Some required variables are missing')
        string = f'postgresql://{cls.DB_USER}:{cls.DB_PASSWORD}'
        string += f'@{cls.DB_HOST}:{cls.DB_PORT}/{cls.DB_NAME}'
        return string


if __name__ == '__main__':
    print(Config.db_string())
