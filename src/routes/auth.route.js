const express = require('express');

const controller = require('../controllers/auth.controller');
const validate = require('../utils/validate');

const { login } = require('../validations/auth.validation');

const router = express.Router();

router
  .route('/login')
  .get(controller.login)
  .post(validate(login), controller.login);

module.exports = router;
