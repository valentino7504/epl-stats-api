import app from './app.js';
import { PORT } from './utils/config.js';

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) console.error('Error in server setup:', err.message);
  console.log('Server listening on port', PORT);
});
