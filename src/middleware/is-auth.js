const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      'xHYKKh-EpP_IumxAePdteJN8i5YBuA06LQLXTY06hAc4XJdkbnlSAAq2KPEgo-FP-uFOpiUyUe0ztz3Blt-7vuiatesY0wZs1IQPIC-dhgtxmeiB6AHIOlilASjiPmQVor1gI4JeLQ-7YlnxspIQQBA9FfUSOsZxEOQTwYt87OeTrvcjjfZJ6-SXyqfsIGl-Tv47wujmZs8QHTppXoUw0nLxILh2sywv9CYj7Mp1reDCej9EcE81JDFWV_Xja1VqS-MZMh_uBoe5GuyPntWw1-CeHg2rvUnDoIRcP1f799fw4eWp7hIe5xkwW-kxtiZM364rzbdgTcbiSy6WuS5OWw',
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
