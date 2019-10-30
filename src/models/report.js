import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReportSchema = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    date: { type: Date, require: true },
    placement: { type: Number, require: false },
    video: { type: Number, require: false },
    hours: { type: Number, require: false },
    returnVisits: { type: Number, require: false },
    studies: { type: Number, require: false },
    addHours: { type: Number, require: false },
    comment: { type: String, require: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Report', ReportSchema);
