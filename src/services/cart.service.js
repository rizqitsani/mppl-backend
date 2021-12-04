const { nanoid } = require('nanoid');
const db = require('../config/db');

class CartService {
  constructor() {
    this.Cart = db.sequelize.models.Cart;
    this.Product = db.sequelize.models.Product;
    this.ProductPhoto = db.sequelize.models.ProductPhoto;
  }

  async getAllCartsByUserId(userId) {
    const cartItems = await this.Cart.findAll({
      include: [
        {
          model: this.Product,
          as: 'product',
          attributes: ['name', 'price'],
          include: [
            {
              model: this.ProductPhoto,
              as: 'photos',
              attributes: ['id', 'photo_link'],
            },
          ],
        },
      ],
      where: {
        user_id: userId,
      },
    });

    return cartItems;
  }

  calculateCartTotal(cartItems) {
    return cartItems.reduce(
      (prev, current) => prev + current.product.price * current.quantity,
      0,
    );
  }

  async findCartByUserAndProductId(userId, productId) {
    const cart = this.Cart.findOne({
      where: { user_id: userId, product_id: productId },
    });
    return cart;
  }

  async addCart(userId, productId) {
    const cart = await this.Cart.create({
      id: nanoid(),
      user_id: userId,
      product_id: productId,
      quantity: 1,
    });
    return cart;
  }

  async updateCart(userId, productId, quantity) {
    const [isUpdated] = await this.Cart.update(
      { quantity },
      { where: { user_id: userId, product_id: productId } },
    );
    return isUpdated;
  }

  async deleteCart(userId, productId) {
    const isDeleted = await this.Cart.destroy({
      where: { user_id: userId, product_id: productId },
    });
    return isDeleted;
  }

  async deleteCartByUserId(userId) {
    const isDeleted = await this.Cart.destroy({
      where: { user_id: userId },
    });
    return isDeleted;
  }
}

module.exports = CartService;
