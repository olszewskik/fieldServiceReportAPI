const User = require('../models/user').UserModel;
const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res, next) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  bCrypt
    .hash(password, 12)
    .then(hashedPwd => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        surname: surname,
        email: email,
        password: hashedPwd,
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found');
        error.statusCode = 401;
        throw error;
      }
      loadUser = user;
      return bCrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Password wrong!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { email: loadUser.email, userId: loadUser._id.toString() },
        'xHYKKh-EpP_IumxAePdteJN8i5YBuA06LQLXTY06hAc4XJdkbnlSAAq2KPEgo-FP-uFOpiUyUe0ztz3Blt-7vuiatesY0wZs1IQPIC-dhgtxmeiB6AHIOlilASjiPmQVor1gI4JeLQ-7YlnxspIQQBA9FfUSOsZxEOQTwYt87OeTrvcjjfZJ6-SXyqfsIGl-Tv47wujmZs8QHTppXoUw0nLxILh2sywv9CYj7Mp1reDCej9EcE81JDFWV_Xja1VqS-MZMh_uBoe5GuyPntWw1-CeHg2rvUnDoIRcP1f799fw4eWp7hIe5xkwW-kxtiZM364rzbdgTcbiSy6WuS5OWw',
        { expiresIn: '1h' },
      );
      res.status(200).json({ token: token, userId: loadUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
