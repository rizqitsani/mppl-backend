const express = require('express');

const controller = require('../controllers/auth.controller');
const validate = require('../utils/validate');

const { login } = require('../validations/auth.validation');

const router = express.Router();

router
  .route('/login')
  .get(controller.login)
  .post(validate(login), controller.login);

router.route('/register').post(controller.register);

module.exports = router;
