const { validationResult } = require('express-validator/check');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        name: 'Kamil Olszewski',
        date: new Date(),
        placement: 1,
        video: 0,
        hours: 1.5,
        returnVisits: 0,
        studies: 0,
      },
      {
        name: 'Kamil Olszewski',
        date: new Date(),
        placement: 3,
        video: 1,
        hours: 3,
        returnVisits: 2,
        studies: 0,
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({
        message: 'Validation failed, entered data is incorrect',
        errors: errors.array(),
      });
  }
  const name = req.body.name;
  const video = req.body.video;
  const hours = req.body.hours;
  const returnVisits = req.body.returnVisits;
  const studies = req.body.studies;

  res.status(201).json({
    message: 'Post created successfully!',
    post: {
      name: name,
      date: new Date().toISOString(),
      video: video,
      hours: hours,
      returnVisits: returnVisits,
      studies: studies,
    },
  });
};
