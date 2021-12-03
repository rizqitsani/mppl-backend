const { body } = require('express-validator');

module.exports = {
  getToken: [
    body('total').isInt({ gt: 0 }),
    body('shipping').isInt({ gt: 0 }),
    body('insurance').isInt({ gt: 0 }),
  ],
  updateTransaction: [body('status').isString()],
};
