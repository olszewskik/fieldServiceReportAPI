import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import feedRoutes from './routes/feed';
import authRoutes from './routes/auth';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/v1.0/feed', feedRoutes);
app.use('/api/v1.0/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

const config = require('./config/config');

mongoose
  .connect(
    `mongodb+srv://${config.database.user}:${config.database.password}@cluster0-2jtwp.mongodb.net/FieldServiceReport?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(config.server.port);
    console.log(`Connect to database on port ${config.server.port}`);
  })
  .catch(err => console.log(err));