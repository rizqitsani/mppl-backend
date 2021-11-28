const express = require('express');
const { StatusCodes } = require('http-status-codes');

const ApiError = require('../errors/ApiError');
const { verifyToken } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const CartService = require('../services/cart.service');

const {
  addCart,
  updateCart,
  deleteCart,
} = require('../validations/cart.validation');

const router = express.Router();

const cartServiceInstance = new CartService();

router
  .route('/')
  .get([verifyToken], async (req, res, next) => {
    try {
      const userId = req.user.id;

      const cart = await cartServiceInstance.getAllCartsByUserId(userId);
      const total = cartServiceInstance.calculateCartTotal(cart);

      return res
        .status(StatusCodes.OK)
        .json({ message: 'Success.', data: { items: cart, total } });
    } catch (error) {
      return next(error);
    }
  })
  .post([verifyToken], validate(addCart), async (req, res, next) => {
    try {
      const userId = req.user.id;
      const productId = req.body.product_id;

      const cart = await cartServiceInstance.addCart(userId, productId);

      return res
        .status(StatusCodes.OK)
        .json({ message: 'Success.', data: cart });
    } catch (error) {
      return next(error);
    }
  })
  .put([verifyToken], validate(updateCart), async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { quantity, product_id: productId } = req.body;

      const isUpdated = await cartServiceInstance.updateCart(
        userId,
        productId,
        quantity,
      );

      if (!isUpdated) {
        throw new ApiError({
          status: StatusCodes.NOT_FOUND,
          message: 'Item tidak ditemukan!',
        });
      }

      const updatedCart = await cartServiceInstance.findCartByUserAndProductId(
        userId,
        productId,
      );

      return res
        .status(StatusCodes.OK)
        .json({ message: 'Success.', data: updatedCart });
    } catch (error) {
      return next(error);
    }
  })
  .delete([verifyToken], validate(deleteCart), async (req, res, next) => {
    try {
      const userId = req.user.id;
      const productId = req.body.product_id;

      const isDeleted = await cartServiceInstance.deleteCart(userId, productId);

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
