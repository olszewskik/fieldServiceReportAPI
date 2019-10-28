import feedRoutes from './report';
import authRoutes from './auth';

export default app => {
  app.use('/api/report', feedRoutes());
  app.use('/api/auth', authRoutes());
};
