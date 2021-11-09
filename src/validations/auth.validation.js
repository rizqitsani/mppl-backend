const { body } = require('express-validator');

module.exports = {
  login: [
    body('username').isLength({ min: 6 }),
    body('email').isEmail().normalizeEmail(),
  ],
};
