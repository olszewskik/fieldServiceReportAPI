import Report from '../models/report';
import mongoose from 'mongoose';

export default {
  async getReport(req, res, next) {
    const report = await Report.findById(req.params.reportId);
    if (!report) return next();
    return res.status(200).json({ message: 'Report fetched', report });
  },

  async getReports(req, res, next) {
    const reports = await Report.find();
    if (!reports) return next();
    return res.status(200).json({ message: 'Fetched reports successfully', reports });
  },

  async createReport(req, res, next) {
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
    }).save();
    return res.status(201).json({
      message: 'Post created successfully!',
      report,
    });
  },

  async updateReport(req, res, next) {
    const updateData = {
      date: req.body.date,
      placement: req.body.placement,
      video: req.body.video,
      hours: req.body.hours,
      returnVisits: req.body.returnVisits,
      studies: req.body.studies,
      addHours: req.body.addHours,
      comment: req.body.comment,
    };
    const report = await Report.findByIdAndUpdate(req.params.reportId, updateData, {
      omitUndefined: false,
      new: true,
    });
    if (!report) return next();
    return res.status(200).json({ report });
  },

  async deleteReport(req, res, next) {
    const report = await Report.findByIdAndRemove(req.params.reportId);
    if (!report) return next();
    return res.status(200).json({ message: 'Report deleted', report });
  },
};

/*
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
*/
