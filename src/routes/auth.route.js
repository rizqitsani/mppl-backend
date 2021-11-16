const express = require('express');
const { StatusCodes } = require('http-status-codes');

const { verifyToken } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const AuthService = require('../services/auth.service');

const { login, register } = require('../validations/auth.validation');

const router = express.Router();

const authServiceInstance = new AuthService();

router.route('/login').post(validate(login), async (req, res, next) => {
  try {
    const token = await authServiceInstance.login(req.body);

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Success.', data: { token } });
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

router.route('/info').post(verifyToken, async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({
      message: 'Success.',
      data: {
        id: req.user.us_id,
        name: req.user.us_nama,
        email: req.user.us_email,
        phone: req.user.us_no_hp,
        address: req.user.us_alamat,
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
