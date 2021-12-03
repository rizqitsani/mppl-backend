const express = require('express');
const { StatusCodes } = require('http-status-codes');

const snap = require('../config/midtrans');
const ApiError = require('../errors/ApiError');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const CartService = require('../services/cart.service');
const TransactionService = require('../services/transaction.service');

const router = express.Router();

const cartServiceInstance = new CartService();
const transactionServiceInstance = new TransactionService();

router.route('/').get(verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const transactions =
      await transactionServiceInstance.getTransactionsByUserId(userId);

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Success.', data: transactions });
  } catch (error) {
    return next(error);
  }
});

router.route('/all').get([verifyToken, isAdmin], async (req, res, next) => {
  try {
    const transactions = await transactionServiceInstance.getAllTransactions();

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Success.', data: transactions });
  } catch (error) {
    return next(error);
  }
});

router.route('/token').post(verifyToken, async (req, res, next) => {
  try {
    const { user } = req;
    const { total, shipping, insurance } = req.body;

    const cart = await cartServiceInstance.getAllCartsByUserId(user.id);

    if (cart.length === 0) {
      throw new ApiError({
        status: StatusCodes.NOT_FOUND,
        message: 'Tidak ada item dalam keranjang!',
      });
    }

    const transaction = await transactionServiceInstance.addTransaction(
      user.id,
      {
        total,
        shipping,
        insurance,
      },
    );

    // Move items from cart to transaction_detail
    await transactionServiceInstance.addTransactionDetail(transaction.id, cart);

    const parameter = {
      transaction_details: {
        order_id: transaction.id,
        gross_amount: total + shipping + insurance,
      },
      callbacks: {
        finish: 'http://localhost:3000/orders',
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: user.full_name,
        last_name: '',
        email: user.email,
        phone: user.telephone,
      },
    };

    const midtransResult = await snap.createTransaction(parameter);

    return res.status(StatusCodes.OK).json({
      message: 'Success.',
      data: { ...midtransResult, id: transaction.id },
    });
  } catch (error) {
    return next(error);
  }
});

router.route('/notification').post(async (req, res, next) => {
  try {
    const response = await snap.transaction.notification(req.body);

    const userId = await transactionServiceInstance.getUserIdFromTransaction(
      response.order_id,
    );

    await cartServiceInstance.deleteCartByUserId(userId.user_id);
    await transactionServiceInstance.updateTransactionStatus(response);

    return res.status(StatusCodes.OK);
  } catch (error) {
    return next(error);
  }
});

router
  .route('/:id')
  .get(verifyToken, async (req, res, next) => {
    try {
      const { id } = req.params;

      const transaction =
        await transactionServiceInstance.getTransactionDetails(id);

      return res
        .status(StatusCodes.OK)
        .json({ message: 'Success.', data: transaction });
    } catch (error) {
      return next(error);
    }
  })
  .put([verifyToken, isAdmin], async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const isUpdated = await transactionServiceInstance.updateShipmentStatus(
        id,
        status,
      );

      if (!isUpdated) {
        throw new ApiError({
          status: StatusCodes.NOT_FOUND,
          message: 'Transaksi tidak ditemukan!',
        });
      }

      return res.status(StatusCodes.OK).json({ message: 'Success.' });
    } catch (error) {
      return next(error);
    }
  })
  .delete(verifyToken, async (req, res, next) => {
    try {
      const userId = req.user.id;
      const transactionId = req.params.id;

      const isDeleted = await transactionServiceInstance.deleteTransaction(
        transactionId,
        userId,
      );

      if (!isDeleted) {
        throw new ApiError({
          status: StatusCodes.NOT_FOUND,
          message: 'Item tidak ditemukan!',
        });
      }

      return res.status(StatusCodes.OK).json({ message: 'Success.' });
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
