import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default {
  mongoUrl: process.env.MONGO_URL,
  settings: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};
