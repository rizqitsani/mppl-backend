const { body } = require('express-validator');

module.exports = {
  addProduct: [
    body('name').isString(),
    body('price').isInt({ gt: 0 }),
    body('stock').isInt({ gt: -1 }),
    body('available').isBoolean(),
  ],
  updateProduct: [
    body('name').isString(),
    body('price').isInt({ gt: 0 }),
    body('stock').isInt({ gt: -1 }),
    body('available').isBoolean(),
  ],
};
