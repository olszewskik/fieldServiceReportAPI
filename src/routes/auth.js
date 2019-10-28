import { Router } from 'express';
import passport from 'passport';
import authController from '../controllers/auth';
import { catchAsync } from '../middleware/errors';

export default () => {
  const api = Router();

  api.post('/login', passport.authenticate('local', { session: false }), authController.login);
  api.post('/register', catchAsync(authController.register));

  return api;
};
