const { nanoid } = require('nanoid');
const db = require('../config/db');

class ProductService {
  constructor() {
    this.Product = db.sequelize.models.Product;
    this.ProductPhoto = db.sequelize.models.ProductPhoto;
  }

  async getAllProducts() {
    const products = await this.Product.findAll({
      include: {
        model: this.ProductPhoto,
        as: 'photos',
        attributes: ['id', 'photo_link'],
      },
    });
    return products;
  }

  async addProduct(productData, productFiles) {
    const product = await this.Product.create({ id: nanoid(), ...productData });

    productFiles.map((file) =>
      this.ProductPhoto.create({
        id: nanoid(),
        product_id: product.id,
        photo_link: file.filename,
      }),
    );

    return product;
  }

  async findProductById(id) {
    const product = await this.Product.findOne({
      include: {
        model: this.ProductPhoto,
        as: 'photos',
        attributes: ['id', 'photo_link'],
      },
      where: { id },
    });
    return product;
  }

  async updateProduct(id, productData, productFiles) {
    const [isUpdated] = await this.Product.update(productData, {
      where: { id },
    });

    if (productFiles.length > 0) {
      await this.ProductPhoto.destroy({ where: { product_id: id } });

      productFiles.map((file) =>
        this.ProductPhoto.create({
          id: nanoid(),
          product_id: id,
          photo_link: file.filename,
        }),
      );
    }

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
