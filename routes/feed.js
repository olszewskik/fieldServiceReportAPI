const express = require('express');
const { body } = require('express-validator/check');
const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/reports', feedController.getReports);

router.post(
  '/report',
  [
    body('name')
      .trim()
      .isString()
      .isLength({ min: 5 }),
    body('video')
      .trim()
      .isNumeric(),
  ],
  feedController.createReport,
);

router.get('/report/:reportId', feedController.getReport);

module.exports = router;
