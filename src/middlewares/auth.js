const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../config/db');
const ApiError = require('../errors/ApiError');

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new ApiError({
        status: StatusCodes.FORBIDDEN,
        message: 'Token tidak diberikan!',
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await db.sequelize.models.User.findOne({
      where: { id: decoded.id },
    });

    req.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};
