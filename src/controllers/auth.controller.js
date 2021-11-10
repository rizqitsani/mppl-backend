const db = require('../config/db');

exports.login = async (req, res, next) => {
  try {
    return res.json('Hello, world!');
  } catch (error) {
    return next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const data = await db.user.create(req.body);

    return res.json({
      message: 'User created',
      data,
    });
  } catch (error) {
    return next(error);
  }
};
