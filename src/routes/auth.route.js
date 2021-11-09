const express = require('express');

const controller = require('../controllers/auth.controller');

const router = express.Router();

router.route('/login').get(controller.login);

module.exports = router;
