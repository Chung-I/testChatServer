/* eslint-disable no-console */

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import api from './api';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dbConfigFile from './config/config.js';
console.log(process.env.NODE_ENV);
const dbConfig = dbConfigFile['development'];

mongoose.Promise = global.Promise;
const dbUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
console.log(dbUrl);
mongoose.connect(dbUrl);


const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
