const express = require('express');
const { body } = require('express-validator/check');
const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/posts', feedController.getPosts);

router.post(
  '/post',
  [
    body('name')
      .trim()
      .isString()
      .isLength({ min: 5 }),
    body('video')
      .trim()
      .isNumeric(),
  ],
  feedController.createPost,
);

module.exports = router;
