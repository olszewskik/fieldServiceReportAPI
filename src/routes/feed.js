import { Router } from 'express';
import feedController from '../controllers/feed';
import { catchAsync } from '../middleware/errors';

export default () => {
  const api = Router();

  api.get('/reports', feedController.getReports);
  api.post('/report', feedController.postReport);
  api.get('/report/:reportId', feedController.getReport);
  api.put('/report/:reportId', feedController.putReport);
  api.delete('/report/:reportId', feedController.deleteReport);

  return api;
};
