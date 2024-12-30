/* eslint-disable max-len */
export const playerSchema = (description, isSinglePlayer = false) => {
  const playerObject = {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The player\'s unique identifier.',
      },
      name: {
        type: 'string',
        description: 'The player\'s name.',
      },
      clubId: {
        type: 'integer',
        description: 'The player\'s club ID.',
      },
      nationality: {
        type: 'string',
        description: 'The player\'s nationality.',
      },
      position: {
        type: 'string',
        description: 'The player\'s position (e.g., Forward, Midfielder).',
      },
      birthDate: {
        type: 'string',
        format: 'date',
        description: 'The player\'s birth date.',
      },
      matchesPlayed: {
        type: 'integer',
        description: 'The number of matches played by the player.',
      },
      yellowCards: {
        type: 'integer',
        description: 'The number of yellow cards received by the player.',
      },
      redCards: {
        type: 'integer',
        description: 'The number of red cards received by the player.',
      },
      starts: {
        type: 'integer',
        description: 'The number of matches the player started.',
      },
      full90s: {
        type: 'integer',
        description: 'The number of full 90-minute matches played by the player.',
      },
      minutes: {
        type: 'integer',
        description: 'The total number of minutes played by the player.',
      },
      goals: {
        type: 'integer',
        description: 'The total number of goals scored by the player.',
      },
      assists: {
        type: 'integer',
        description: 'The total number of assists made by the player.',
      },
      nonPenaltyGoals: {
        type: 'integer',
        description: 'The number of non-penalty goals scored by the player.',
      },
      xG: {
        type: 'number',
        format: 'double',
        description: 'The expected goals (xG) for the player.',
      },
      npxG: {
        type: 'number',
        format: 'double',
        description: 'The expected non-penalty goals (npxG) for the player.',
      },
      xAG: {
        type: 'number',
        format: 'double',
        description: 'The expected assists (xAG) for the player.',
      },
      prgC: {
        type: 'integer',
        description: 'Progressive carries (prgC) for the player.',
      },
      prgP: {
        type: 'integer',
        description: 'Progressive passes (prgP) for the player.',
      },
      goalsP90: {
        type: 'number',
        format: 'double',
        description: 'Goals per 90 minutes played by the player.',
      },
      assistsP90: {
        type: 'number',
        format: 'double',
        description: 'Assists per 90 minutes played by the player.',
      },
      xGp90: {
        type: 'number',
        format: 'double',
        description: 'Expected goals per 90 minutes played by the player.',
      },
      xAGp90: {
        type: 'number',
        format: 'double',
        description: 'Expected assists per 90 minutes played by the player.',
      },
      tackles: {
        type: 'integer',
        description: 'The number of tackles made by the player.',
      },
      saves: {
        type: 'integer',
        description: 'The number of saves made by the player.',
      },
      cleanSheets: {
        type: 'integer',
        description: 'The number of clean sheets kept by the player.',
      },
      interceptions: {
        type: 'integer',
        description: 'The number of interceptions made by the player.',
      },
      blocks: {
        type: 'integer',
        description: 'The number of blocks made by the player.',
      },
      savePercent: {
        type: 'number',
        format: 'double',
        description: 'The save percentage of the player (if applicable).',
      },
      clearances: {
        type: 'integer',
        description: 'The number of clearances made by the player.',
      },
      isCaptain: {
        type: 'boolean',
        description: 'Whether the player is the captain of their team.',
      },
    },
  };

  const response = {
    description,
    content: {
      'application/json': {
        schema: isSinglePlayer
          ? playerObject
          : {
            type: 'array',
            items: playerObject,
          },
      },
    },
  };

  return response;
};

export const clubSchema = (description, isSingle = false) => {
  const clubObject = {
    id: {
      type: 'integer',
      description: 'The club\'s unique identifier.',
    },
    name: {
      type: 'string',
      description: 'The name of the club.',
    },
    founded: {
      type: 'integer',
      minimum: 1700,
      description: 'The year the club was founded.',
    },
    city: {
      type: 'string',
      description: 'The city where the club is located.',
    },
    position: {
      type: 'integer',
      description: 'The current league position of the club.',
    },
    matchesPlayed: {
      type: 'integer',
      description: 'The number of matches played by the club.',
    },
    wins: {
      type: 'integer',
      description: 'The number of wins by the club.',
    },
    draws: {
      type: 'integer',
      description: 'The number of draws by the club.',
    },
    losses: {
      type: 'integer',
      description: 'The number of losses by the club.',
    },
    goalDifference: {
      type: 'integer',
      description: 'The goal difference of the club.',
    },
    goalsScored: {
      type: 'integer',
      description: 'The total number of goals scored by the club.',
    },
    goalsConceded: {
      type: 'integer',
      description: 'The total number of goals conceded by the club.',
    },
    points: {
      type: 'integer',
      description: 'The total points of the club.',
    },
    ppg: {
      type: 'number',
      format: 'double',
      description: 'Points per game for the club.',
    },
    xG: {
      type: 'number',
      format: 'double',
      description: 'Expected goals (xG) for the club.',
    },
    xGA: {
      type: 'number',
      format: 'double',
      description: 'Expected goals against (xGA) for the club.',
    },
    xGD: {
      type: 'number',
      format: 'double',
      description: 'Expected goal difference (xGD) for the club.',
    },
    xGDp90: {
      type: 'number',
      format: 'double',
      description: 'Expected goal difference per 90 minutes (xGDp90) for the club.',
    },
    xGp90: {
      type: 'number',
      format: 'double',
      description: 'Expected goals per 90 minutes (xGp90) for the club.',
    },
    lastFive: {
      type: 'string',
      description: 'Form in the last five matches.',
    },
    attendancePerGame: {
      type: 'integer',
      description: 'Average attendance per game for the club.',
    },
    possession: {
      type: 'number',
      format: 'double',
      description: 'Average possession percentage for the club.',
    },
    prgC: {
      type: 'integer',
      description: 'Progressive carries (prgC) for the club.',
    },
    prgP: {
      type: 'integer',
      description: 'Progressive passes (prgP) for the club.',
    },
    noPlayers: {
      type: 'integer',
      description: 'The total number of players in the club.',
    },
    averageAge: {
      type: 'number',
      format: 'double',
      description: 'Average age of the players in the club.',
    },
    stadium: {
      type: 'string',
      description: 'The stadium of the club.',
    },
    nickname: {
      type: 'string',
      description: 'The nickname of the club.',
    },
    stadiumCapacity: {
      type: 'integer',
      description: 'The seating capacity of the club\'s stadium.',
    },
    manager: {
      type: 'string',
      description: 'The manager of the club.',
    },
  };

  const schema = {
    type: isSingle ? 'object' : 'array',
    ...(isSingle
      ? { properties: clubObject }
      : { items: { type: 'object', properties: clubObject } }),
  };

  return {
    description,
    content: {
      'application/json': { schema },
    },
  };
};
