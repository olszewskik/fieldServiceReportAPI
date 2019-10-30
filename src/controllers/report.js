import Report from '../models/report';
import mongoose from 'mongoose';

/*
exports.postReport = (req, res, next) => {
  const report = new Report({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    name: req.body.name,
    date: new Date().toISOString(),
    placement: req.body.placement,
    video: req.body.video,
    hours: req.body.hours,
    returnVisits: req.body.returnVisits,
    studies: req.body.studies,
    addHours: req.body.addHours,
    comment: req.body.comment,
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

 */

export default {
  async getReport(req, res, next) {
    const report = await Report.findById(req.params.reportId);
    if (!report) return next();
    return res.status(200).json({ message: 'Report fetched', report: report });
  },

  async getReports(req, res, next) {
    const reports = await Report.find();
    if (!reports) return next();
    return res.status(200).json({ message: 'Fetched reports successfully', reports: reports });
  },

  async postReport(req, res, next) {
    const report = await new Report({
      userId: req.user._id,
      date: req.body.date,
      placement: req.body.placement,
      video: req.body.video,
      hours: req.body.hours,
      returnVisits: req.body.returnVisits,
      studies: req.body.studies,
      addHours: req.body.addHours,
      comment: req.body.comment,
    }
    ).save();
    return res.status(201).json({
      message: 'Post created successfully!',
      report: report,
    });
  },
};

exports.putReport = (req, res, next) => {
  const reportId = req.params.reportId;
  Report.findById(reportId)
    .then(report => {
      if (!reportId) {
        const error = new Error('Could not find report!');
        error.statusCode(404);
        throw error;
      }
      report.placement = req.body.placement;
      report.video = req.body.video;
      report.hours = req.body.hours;
      report.returnVisits = req.body.returnVisits;
      report.studies = req.body.studies;
      report.addHours = req.body.addHours;
      report.comment = req.body.comment;
      return report.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Report updated', report: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteReport = (req, res, next) => {
  const reportId = req.params.reportId;
  Report.findById(reportId)
    .then(report => {
      if (!reportId) {
        const error = new Error('Could not find report!');
        error.statusCode(404);
        throw error;
      }
      return Report.findByIdAndRemove(reportId);
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Report deleted' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
