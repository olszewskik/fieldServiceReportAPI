import feedRoutes from './feed';
import authRoutes from './auth';

export default app => {
  app.use('/api/feed', feedRoutes());
  app.use('/api/auth', authRoutes());
};
