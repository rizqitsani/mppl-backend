const express = require('express');

const authRoutes = require('./auth.route');
const cartRoutes = require('./cart.route');
const productRoutes = require('./product.route');
const transactionRoutes = require('./transaction.route');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;
