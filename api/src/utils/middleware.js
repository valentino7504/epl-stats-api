import morgan from 'morgan';
import { ENV } from './config.js';

export const logger = morgan('dev');

/* eslint-disable-next-line no-unused-vars */
export const notFound = (req, res) => res.status(404).json({ error: 'Not found', message: 'URL not found' });

/* eslint-disable-next-line no-unused-vars */
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: ENV === 'dev' ? 'server error' : err.stack,
  });
};

function toCamelCase(snakeCaseObject) {
  const result = {};
  const objectKeys = Object.keys(snakeCaseObject);
  for (let i = 0; i < objectKeys.length; i += 1) {
    let camelCaseKey = objectKeys[i].replace(/(_\w)/g, (m) => m[1].toUpperCase());
    if (['xGP90', 'xAGP90'].includes(camelCaseKey)) {
      camelCaseKey = camelCaseKey.replace('P90', 'p90');
    }
    result[camelCaseKey] = snakeCaseObject[objectKeys[i]];
  }
  return result;
}

export function normalizeResponse(req, res, next) {
  const originalJson = res.json;

  res.json = function convertSnakeCase(data) {
    if (Array.isArray(data)) {
      data = data.map(toCamelCase);
    } else if (typeof data === 'object' && data !== null) {
      data = toCamelCase(data);
    }
    return originalJson.call(this, data);
  };

  next();
}

export function stripTimestamps(req, res, next) {
  const originalJson = res.json;
  let newData;
  res.json = function stripTimeStamps(data) {
    if (Array.isArray(data)) {
      newData = data.map((item) => {
        const { createdAt, updatedAt, ...strippedItem } = item;
        return strippedItem;
      });
    } else if (typeof data === 'object' && data !== null) {
      const { createdAt, updatedAt, ...strippedData } = data;
      newData = strippedData;
    }
    return originalJson.call(this, newData);
  };

  next();
}

export function formatBirthDate(req, res, next) {
  const originalJson = res.json;
  res.json = function formatBirth(data) {
    if (Array.isArray(data)) {
      data = data.map((item) => {
        const formattedItem = { ...item };
        if (formattedItem.birthDate) {
          [formattedItem.birthDate] = formattedItem.birthDate.split(' ');
        }
        const { createdAt, updatedAt, ...strippedItem } = formattedItem;
        return strippedItem;
      });
    } else if (typeof data === 'object' && data !== null) {
      const formattedData = { ...data };
      if (formattedData.birthDate) {
        [formattedData.birthDate] = formattedData.birthDate.split(' ');
      }
      const { createdAt, updatedAt, ...strippedData } = formattedData;
      data = strippedData;
    }
    return originalJson.call(this, data);
  };
  next();
}
