/* eslint-disable */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { playerSchema, clubSchema } from './swaggerSchema.js';
import { SITE_URL } from '../src/utils/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const options = {
  openapi: '3.1.0', // OpenAPI version
  info: {
    title: 'EPL Stats API',
    version: '1.0.0',
    description: 'An EPL stats API for fetching stats about players and clubs in the EPL for the current season.',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Edwin@Premstats',
      email: 'valentino7504@premstats.tech',
    },
  },
  servers: [
    {
      url: SITE_URL,
    },
  ],
  paths: {
    '/api/players': {
      get: {
        tags: [
          'players',
        ],
        summary: 'Get a list of players',
        description: 'Retrieve a list of players, optionally filtered by name.',
        parameters: [
          {
            in: 'query',
            name: 'name',
            description: 'Name of the player to filter by.',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: playerSchema('Returns a list of players with various details for current season'),
          400: {
            description: 'Bad request, invalid parameters.',
          },
          500: {
            description: 'Internal server error.',
          },
        },
      },
    },
    '/api/players/{id}': {
      get: {
        tags: [
          'players',
        ],
        summary: 'Get a specific player by ID',
        description: 'Retrieve detailed information about a specific player using their unique ID.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'The unique ID of the player to retrieve.',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          200: playerSchema('Returns detailed information about a specific player.', true),
          404: {
            description: 'Player not found.',
          },
          500: {
            description: 'Internal server error.',
          },
        },
      },
    },
    '/api/clubs': {
      get: {
        tags: [
          'clubs',
        ],
        summary: 'Get all clubs',
        description: 'Retrieve a list of clubs with their details.',
        parameters: [
          {
            in: 'query',
            name: 'name',
            description: 'Name of the club to filter by.',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: clubSchema('A list of all clubs filtered by the name query.', false),
          400: {
            description: 'Bad request.',
          },
          500: {
            description: 'Internal server error.',
          },
        },
      },
    },
    '/api/clubs/{id}': {
      get: {
        tags: [
          'clubs',
        ],
        summary: 'Get a club by ID',
        description: 'Retrieve details of a specific club by its unique ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The unique identifier of the club.',
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          200: clubSchema('Details of the specified club.', true),
          400: {
            description: 'Bad request. Invalid ID supplied.',
          },
          404: {
            description: 'Club not found.',
          },
          500: {
            description: 'Internal server error.',
          },
        },
      },
    },
  },
  apis: [`${__dirname}/src/routes/*.js`],
};

export default options;
