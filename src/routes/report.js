import { Router } from 'express';
import reportController from '../controllers/report';
import { catchAsync } from '../middleware/errors';

export default () => {
  const api = Router();

  //api.get('/reports', feedController.getReports);
  //api.post('/report', feedController.postReport);
  api.get('/reports', reportController.getReports);
  api.get('/reports/:reportId', catchAsync(reportController.getReport));
  api.post('/reports', catchAsync(reportController.postReport));
  api.put('/reports/:reportId');
  api.delete('reports/:reportId')

  //api.put('/report/:reportId', feedController.putReport);
  //api.delete('/report/:reportId', feedController.deleteReport);

  return api;
};
