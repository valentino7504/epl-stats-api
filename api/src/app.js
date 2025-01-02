import express from 'express';
import * as path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as middleware from './utils/middleware.js';
import playersRouter from './routes/players.js';
import clubsRouter from './routes/clubs.js';
import usersRouter from './routes/users.js';
import collectionsRouter from './routes/collections.js';
import options from '../docs/swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.logger);
app.use(middleware.stripTimestamps);
app.use(middleware.normalizeResponse);
app.use(middleware.formatBirthDate);

app.get('/', (req, res) => {
  res.redirect('/api/docs');
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'favicon.ico'));
});

app.use('/api/players', playersRouter);
app.use('/api/clubs', clubsRouter);
app.use('/api/users', usersRouter);
app.use('/api/collections', collectionsRouter);

const extraOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Premstats API',
  customfavIcon: `${__dirname}/../assets/favicon.ico`,
};
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(options, extraOptions));

app.use(middleware.notFound);
app.use(middleware.errorHandler);

export default app;
