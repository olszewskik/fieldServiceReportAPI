const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, require: true },
    name: { type: String, require: true },
    surname: { type: String, require: true },
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true },
  },
  {
    timestamp: true,
  },
);

module.exports.UserModel = mongoose.model('User', userSchema);
