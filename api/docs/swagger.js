import { SCHEME, SITE_URL } from '../src/utils/config.js';

const options = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Premstats API',
    description: 'An API to get EPL stats for the current season, create collections etc',
  },
  host: SITE_URL.split('//')[1],
  schemes: [SCHEME],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter the token with the `Bearer ` prefix, e.g Bearer a68a394e-51a9-421f-b497-0899df4286e2',
    },
  },
  paths: {
    '/api/players': {
      get: {
        tags: [
          'players',
        ],
        summary: 'Gets a list of players',
        description: 'Returns a list of players matching the name query or a list of all players',
        parameters: [
          {
            name: 'name',
            in: 'query',
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
    },
    '/api/players/{id}': {
      get: {
        tags: [
          'players',
        ],
        summary: 'Gets a single player object by ID',
        description: 'Returns a single player object whose ID matches the param ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/api/clubs': {
      get: {
        tags: [
          'clubs',
        ],
        summary: 'Gets a list of clubs',
        description: 'Returns a list of clubs matching the name query or a list of all clubs',
        parameters: [
          {
            name: 'name',
            in: 'query',
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
    },
    '/api/clubs/{id}': {
      get: {
        tags: [
          'clubs',
        ],
        summary: 'Gets a single club object by ID',
        description: 'Returns a single club object whose ID matches the param ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/api/users/signup': {
      post: {
        tags: [
          'users',
        ],
        summary: 'Create a new user profile',
        description: 'Signs the user up and generates a new API token. Takes in email and password and returns token',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                sendEmail: {
                  example: true,
                },
                email: {
                  example: 'example@email.com',
                },
                password: {
                  example: 'topSecretPassword',
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Created',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/api/users/me': {
      get: {
        tags: [
          'users',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Gets the currently authorized user',
        description: 'Reads the bearer auth key and obtains user details - id and email',
        responses: {
          200: {
            description: 'OK',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
      delete: {
        tags: [
          'users',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Deletes the currently authorized user',
        description: 'Deletes the authorized user of the bearer token',
        responses: {
          204: {
            description: 'No Content',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
      post: {
        tags: [
          'users',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Updates the user',
        description: 'Updates authorized user\'s details ie email and password',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                newEmail: {
                  example: 'newexample@email.com',
                },
                newPassword: {
                  example: 'newPwd',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/api/users/generate_token': {
      post: {
        tags: [
          'users',
        ],
        summary: 'Generates a new API token',
        description: 'Checks email and password and issues new token to the user',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                email: {
                  example: 'example@email.com',
                },
                password: {
                  example: 'superSecretKini',
                },
                sendEmail: {
                  example: false,
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Created',
          },
          400: {
            description: 'Bad Request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/api/users/revoke_all_tokens': {
      delete: {
        tags: [
          'users',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Revokes all user tokens',
        description: 'Revokes all tokens for the authorized user, including the one in use',
        responses: {
          204: {
            description: 'No Content',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/api/users/reset_password': {
      post: {
        tags: [
          'users',
        ],
        summary: 'Reset password route',
        description: 'Initiates the reset password process',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                email: {
                  example: 'user@email.com',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/api/collections': {
      get: {
        tags: [
          'collections',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Gets a list of collections',
        description: 'Gets a list of collections belonging to the authorized user, optionally filtered by name',
        parameters: [
          {
            name: 'name',
            in: 'query',
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
      post: {
        tags: [
          'collections',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Creates a new collection',
        description: 'Creates a new collection for the authorized user',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                name: {
                  example: 'MyCollection',
                },
                description: {
                  example: 'This is my collection',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'Bad Request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/api/collections/{id}': {
      get: {
        tags: [
          'collections',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Gets a single collection',
        description: 'Gets the collection owned by the authorized user with the specified ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
      delete: {
        tags: [
          'collections',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Deletes a collection',
        description: 'Deletes collection with specified ID that belongs to the authorized user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          204: {
            description: 'No Content',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
      post: {
        tags: [
          'collections',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Edit collection metadata',
        description: 'Edit the metadata of collection with specified ID that belongs to the authorized user. Metadata includes name and description',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                name: {
                  example: 'New Collection Name',
                },
                description: {
                  example: 'What a description can do is prepare you for what is to come',
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Updated',
          },
          400: {
            description: 'Bad Request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/api/collections/{id}/players': {
      post: {
        tags: [
          'collections',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Adds players to a collection',
        description: 'Add a group of players to the collection with the specified ID belonging to the authorized user based on a list of player IDs',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                players: {
                  example: [10, 30, 40],
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Updated',
          },
          400: {
            description: 'Bad Request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
      delete: {
        tags: [
          'collections',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Delete players from a collection',
        description: 'Delete a group of players from he collection with the specified ID belonging to the authorized user based on a list of player IDs',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                players: {
                  example: [10, 20, 40],
                },
              },
            },
          },
        ],
        responses: {
          204: {
            description: 'No Content',
          },
          400: {
            description: 'Bad Request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/api/collections/{id}/clubs': {
      post: {
        tags: [
          'collections',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Adds clubs to a collection',
        description: 'Add a group of clubs to the collection with the specified ID belonging to the authorized user based on a list of club IDs',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                clubs: {
                  example: [1, 2, 5],
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Created',
          },
          400: {
            description: 'Bad Request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
      delete: {
        tags: [
          'collections',
        ],
        security: [
          { Bearer: [] },
        ],
        summary: 'Delete clubs from a collection',
        description: 'Delete a group of clubs from he collection with the specified ID belonging to the authorized user based on a list of club IDs',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                clubs: {
                  example: [5, 4, 9],
                },
              },
            },
          },
        ],
        responses: {
          204: {
            description: 'No Content',
          },
          400: {
            description: 'Bad Request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
  },
};

export default options;
