const express = require('express');
const { StatusCodes } = require('http-status-codes');

const config = require('../config');
const ApiError = require('../errors/ApiError');
const { verifyToken } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const AuthService = require('../services/auth.service');

const { login, register } = require('../validations/auth.validation');

const router = express.Router();

const authServiceInstance = new AuthService();

router.route('/login').post(validate(login), async (req, res, next) => {
  try {
    const { token, refreshToken } = await authServiceInstance.login(req.body);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: config.refreshTokenExpire * 1000,
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Success.', data: { token, refreshToken } });
  } catch (error) {
    return next(error);
  }
});

router.route('/register').post(validate(register), async (req, res, next) => {
  try {
    const data = await authServiceInstance.register(req.body);

    return res.status(StatusCodes.OK).json({
      message: 'Success.',
      data,
    });
  } catch (error) {
    return next(error);
  }
});

router.route('/info').get(verifyToken, async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({
      message: 'Success.',
      data: {
        id: req.user.id,
        role: req.user.role,
        name: req.user.full_name,
        email: req.user.email,
        phone: req.user.telephone,
        address: req.user.address,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.route('/refresh-token').post(async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      throw new ApiError({
        status: StatusCodes.FORBIDDEN,
        message: 'Refresh token tidak diberikan!',
      });
    }

    const token = await authServiceInstance.verifyRefreshToken(refreshToken);

    return res.status(StatusCodes.OK).json({
      message: 'Success.',
      data: {
        token,
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
