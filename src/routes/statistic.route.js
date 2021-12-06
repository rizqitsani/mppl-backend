const express = require('express');
const { StatusCodes } = require('http-status-codes');

const { verifyToken, isAdmin } = require('../middlewares/auth');
const ProductService = require('../services/product.service');
const TransactionService = require('../services/transaction.service');
const UserService = require('../services/user.service');

const router = express.Router();

const productServiceInstance = new ProductService();
const transactionServiceInstance = new TransactionService();
const userServiceInstance = new UserService();

router.route('/').get([verifyToken, isAdmin], async (req, res, next) => {
  try {
    const product = await productServiceInstance.getStatistics();
    const transaction = await transactionServiceInstance.getStatistics();
    const user = await userServiceInstance.getStatistics();

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Success.', data: { product, transaction, user } });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
