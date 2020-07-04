import http = require('http');
import path = require('path');
import express = require('express');
import { isProduction } from './app-config';
import { configure as configureRoutes } from './routing';

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json({ strict: false }));

configureRoutes(app);

// serve client files if we are in development mode
if (!isProduction()) {
  const history = require('connect-history-api-fallback');
  const assets = path.resolve(__dirname, 'public');

  app.use(history());
  app.use(express.static(assets, { etag: false }));
}

server.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
