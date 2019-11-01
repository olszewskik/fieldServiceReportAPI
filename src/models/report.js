import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReportSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    date: {
      type: Date,
      default: Date.now,
      require: true,
    },
    placement: {
      type: Number,
      default: 0,
      require: false,
    },
    video: {
      type: Number,
      default: 0,
      require: false,
    },
    hours: {
      type: Number,
      default: 0,
      require: false,
    },
    returnVisits: {
      type: Number,
      default: 0,
      require: false,
    },
    studies: {
      type: Number,
      default: 0,
      require: false,
    },
    addHours: {
      type: Number,
      default: 0,
      require: false,
    },
    comment: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Report', ReportSchema);
