const { validationResult } = require('express-validator/check');
const Report = require('../models/report').ReportModel;
const mongoose = require('mongoose');

exports.getReports = (req, res, next) => {
  Report.find()
    .then(reports => {
      res
        .status(200)
        .json({ message: 'Fetched reports successfully', reports: reports });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createReport = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode(422);
    throw error;
  }
  const report = new Report({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    date: new Date().toISOString(),
    placement: req.body.placement,
    video: req.body.video,
    hours: req.body.hours,
    returnVisits: req.body.returnVisits,
    studies: req.body.studies,
  });
  report
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Post created successfully!',
        report: result,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getReport = (req, res, next) => {
  const reportId = req.params.reportId;
  Report.findById(reportId)
    .then(report => {
      if (!reportId) {
        const error = new Error('Could not find report!');
        error.statusCode(404);
        throw error;
      }
      res.status(200).json({ message: 'Report fetched', report: report });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
