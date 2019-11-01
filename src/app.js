import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes';
import morgan from 'morgan';
import { notFound, catchErrors } from './middleware/errors';
import passport from './config/passport';

// Connect to database
import dbConfig from './config/database';
import mongoose from 'mongoose';

passport();

mongoose.connect(process.env.MONGO_URL, dbConfig.settings).then(() => {
  console.log('Connected to database');
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.log('Could not connect to the database.');
  process.exit();
});

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

apiRoutes(app);

//app.use(notFound);
//app.use(catchErrors);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT} - Running on ${process.env.NODE_ENV}`);
});
