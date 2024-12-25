import express from 'express';
import * as path from 'path';
import cors from 'cors';
import * as middleware from './utils/middleware.js';
import playersRouter from './controllers/players.js';
import clubsRouter from './controllers/clubs.js';

const app = express();
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'favicon.ico'));
});
app.use(cors());
app.use(express.json());
app.use(middleware.logger);
app.use('/api/players', playersRouter);
app.use('/api/clubs', clubsRouter);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

export default app;
