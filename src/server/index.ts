import { resolve } from 'path';
import express = require('express');

const app = express();

app.use(express.static(resolve(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000.');
});
