import { Router } from 'express';
import reportController from '../controllers/report';
import { catchAsync } from '../middleware/errors';
import jwAuth from '../middleware/auth';

export default () => {
  const api = Router();

  api.get('/reports', catchAsync(reportController.getReports));
  api.get('/reports/:reportId', jwAuth, catchAsync(reportController.getReport));
  api.post('/reports', jwAuth, catchAsync(reportController.createReport));
  api.put('/reports/:reportId', jwAuth, catchAsync(reportController.updateReport));
  api.delete('/reports/:reportId', jwAuth, catchAsync(reportController.deleteReport));

  return api;
};
