import path = require('path');
import history = require('connect-history-api-fallback');
import express = require('express');
import { isProduction } from './app-config';
import { configure as configureRoutes } from './routing';

const port = process.env.PORT || 3000;
const app = express();

configureRoutes(app);

// serve client files if we are in development mode
if (!isProduction()) {
  const assets = path.resolve(__dirname, 'public');

  app.use(history());
  app.use(express.static(assets, { etag: false }));
}

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
