const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, require: true },
    name: { type: String, require: true },
    date: { type: Date, require: true },
    placement: { type: Number, require: false },
    video: { type: Number, require: false },
    hours: { type: Number, require: false },
    returnVisits: { type: Number, require: false },
    studies: { type: Number, require: false },
  },
  { timestamp: true },
);

module.exports.ReportModel = mongoose.model('Report', reportSchema);