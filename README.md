# epl-stats-api
A RESTful API for accessing English Premier League statistics. It is built to provide comprehensive statistics and information about the EPL in the current season.
The API leverages Express.js for server side logic and Drizzle for interactions with the database.

## Features
- Player Statistics: Access detailed stats for players, including goals, assists and more
- Team Data: Retrieve data about clubs, such as performance metrics.
- Collections: Users can create and manage collections of players clubs for personalized tracking.
- Scraping: Data scraping regularly on the server with a Python based scraper to ensure up-to-date statistics.

## Tech Stack
- **Backend Framework:** Express.js
- **Database:** PostgreSQL, migrations managed by Drizzle ORM
- **Scraper:** Python for data gathering using pandas and sqlalchemy
- **API Documentation:** Swagger/OpenAPI

The API is live at [premstats.tech](https://premstats.tech)
