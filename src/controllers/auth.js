import jwt from 'jsonwebtoken';
import User from '../models/user';

export default {
  async login(req, res, next) {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    return res.status(200).json({ token });
  },

  async register(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({ firstName, lastName, email });
    await User.register(user, password);

    return res.status(201).json({ message: 'User created!', userId: user._id });
  },
};
