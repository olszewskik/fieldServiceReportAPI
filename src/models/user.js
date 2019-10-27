import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: {
      type: String, require: true, unique: true, lowercase: true, trim: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default mongoose.model('User', UserSchema);
