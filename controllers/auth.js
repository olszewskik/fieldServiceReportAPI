const User = require('../models/user').UserModel;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

exports.registerUser = (req, res, next) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
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
