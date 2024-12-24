import morgan from 'morgan';
import { ENV } from './config.js';

export const logger = morgan('dev');

/* eslint-disable-next-line no-unused-vars */
export const notFound = (req, res) => {
  res.status(404).json({ Error: 'URL not found' });
};

/* eslint-disable-next-line no-unused-vars */
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: ENV === 'dev' ? 'server error' : err.stack,
  });
};
