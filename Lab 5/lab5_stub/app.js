import express from 'express';
const app = express();
import configRoutesFunction from './routes/index.js';

configRoutesFunction(app);

app.listen(3000, () => {
  console.log('Your routes will be running on http://localhost:3000');
});