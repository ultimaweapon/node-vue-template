import path = require('path');
import express = require('express');

const port = process.env.PORT || 3000;
const production = (process.env.NODE_ENV === 'production');
const app = express();

// serve client files if we are in development mode
if (!production) {
  const assets = path.resolve(__dirname, 'public');
  app.use(express.static(assets, { etag: false }));
}

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
