const express = require('express');
const { StatusCodes } = require('http-status-codes');

const ApiError = require('../errors/ApiError');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const ProductService = require('../services/product.service');

const {
  addProduct,
  updateProduct,
} = require('../validations/product.validation');

const router = express.Router();

const productServiceInstance = new ProductService();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const products = await productServiceInstance.getAllProducts();

      return res
        .status(StatusCodes.OK)
        .json({ message: 'Success.', data: products });
    } catch (error) {
      return next(error);
    }
  })
  .post(
    [verifyToken, isAdmin],
    validate(addProduct),
    async (req, res, next) => {
      try {
        const product = await productServiceInstance.addProduct(req.body);

        return res
          .status(StatusCodes.OK)
          .json({ message: 'Success.', data: product });
      } catch (error) {
        return next(error);
      }
    },
  );

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productServiceInstance.findProductById(id);

      if (!product) {
        throw new ApiError({
          status: StatusCodes.NOT_FOUND,
          message: 'Produk tidak ditemukan!',
        });
      }

      return res
        .status(StatusCodes.OK)
        .json({ message: 'Success.', data: product });
    } catch (error) {
      return next(error);
    }
  })
  .put(
    [verifyToken, isAdmin],
    validate(updateProduct),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const isUpdated = await productServiceInstance.updateProduct(
          id,
          req.body,
        );

        if (!isUpdated) {
          throw new ApiError({
            status: StatusCodes.NOT_FOUND,
            message: 'Produk tidak ditemukan!',
          });
        }

        const updatedProduct = await productServiceInstance.findProductById(id);

        return res
          .status(StatusCodes.OK)
          .json({ message: 'Success.', data: updatedProduct });
      } catch (error) {
        return next(error);
      }
    },
  )
  .delete([verifyToken, isAdmin], async (req, res, next) => {
    try {
      const { id } = req.params;
      const isDeleted = await productServiceInstance.deleteProduct(id);

      if (!isDeleted) {
        throw new ApiError({
          status: StatusCodes.NOT_FOUND,
          message: 'Produk tidak ditemukan!',
        });
      }

      return res.status(StatusCodes.OK).json({ message: 'Success.' });
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
