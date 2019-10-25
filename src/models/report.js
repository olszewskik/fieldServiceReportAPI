const mongoose = require('mongoose');
const User = require('./user').UserModel;
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, require: true },
    userId: { type: mongoose.ObjectId, ref: User },
    name: { type: String, require: true },
    date: { type: Date, require: true },
    placement: { type: Number, require: false },
    video: { type: Number, require: false },
    hours: { type: Number, require: false },
    returnVisits: { type: Number, require: false },
    studies: { type: Number, require: false },
    addHours: { type: Number, require: false },
    comment: { type: String, require: false },
  },
  { timestamp: true },
);

module.exports.ReportModel = mongoose.model('Report', reportSchema);
