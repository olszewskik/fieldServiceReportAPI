const express = require('express');
const { body } = require('express-validator/check');
const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/reports', feedController.getReports);

router.post('/report', [
    body('name')
      .trim()
      .isString()
      .isLength({ min: 5 }),
    body('video')
      .trim()
      .isNumeric(),
  ], feedController.postReport,);

router.get('/report/:reportId', feedController.getReport);
router.put('/report/:reportId', feedController.putReport);
router.delete('/report/:reportId', feedController.deleteReport);

module.exports = router;
