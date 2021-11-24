const { nanoid } = require('nanoid');
const db = require('../config/db');

class ProductService {
  constructor() {
    this.Product = db.sequelize.models.Product;
    this.ProductPhoto = db.sequelize.models.ProductPhoto;
  }

  async getAllProducts() {
    const products = await this.Product.findAll({
      include: { model: this.ProductPhoto, as: 'photos' },
    });
    return products;
  }

  async addProduct(productData) {
    const product = await this.Product.create({ id: nanoid(), ...productData });
    return product;
  }

  async findProductById(id) {
    const product = await this.Product.findOne({
      where: { id },
    });
    return product;
  }

  async updateProduct(id, productData) {
    const [isUpdated] = await this.Product.update(productData, {
      where: { id },
    });
    return isUpdated;
  }

  async deleteProduct(id) {
    const isDeleted = await this.Product.destroy({
      where: { id },
    });
    return isDeleted;
  }
}

module.exports = ProductService;
