const { nanoid, customAlphabet } = require('nanoid');
const db = require('../config/db');

class TransactionService {
  constructor() {
    this.Transaction = db.sequelize.models.Transaction;
    this.TransactionDetail = db.sequelize.models.TransactionDetail;
    this.Product = db.sequelize.models.Product;
    this.ProductPhoto = db.sequelize.models.ProductPhoto;
  }

  async getAllTransactions() {
    const transactions = await this.Transaction.findAll({
      include: [
        {
          model: this.TransactionDetail,
          as: 'items',
          attributes: ['id', 'quantity'],
          include: [
            {
              model: this.Product,
              as: 'product',
              attributes: ['id', 'name', 'price'],
              include: [
                {
                  model: this.ProductPhoto,
                  as: 'photos',
                  attributes: ['id', 'photo_link'],
                },
              ],
            },
          ],
        },
      ],
    });
    return transactions;
  }

  async getTransactionsByUserId(userId) {
    const transactions = await this.Transaction.findAll({
      include: [
        {
          model: this.TransactionDetail,
          as: 'items',
          attributes: ['id', 'quantity'],
          include: [
            {
              model: this.Product,
              as: 'product',
              attributes: ['id', 'name', 'price'],
              include: [
                {
                  model: this.ProductPhoto,
                  as: 'photos',
                  attributes: ['id', 'photo_link'],
                },
              ],
            },
          ],
        },
      ],
      where: {
        user_id: userId,
      },
    });
    return transactions;
  }

  async getTransactionDetails(id) {
    const transaction = await this.Transaction.findOne({
      include: [
        {
          model: this.TransactionDetail,
          as: 'items',
          attributes: ['id', 'quantity'],
          include: [
            {
              model: this.Product,
              as: 'product',
              attributes: ['id', 'name', 'price'],
            },
          ],
        },
      ],
      where: { id },
    });
    return transaction;
  }

  async addTransaction(userId, cost) {
    const nano = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
    const transaction = await this.Transaction.create({
      id: nano(),
      user_id: userId,
      total: cost.total,
      shipping_cost: cost.shipping,
      insurance_cost: cost.insurance,
      shipment_status: 'Belum dibayar',
    });
    return transaction;
  }

  async addTransactionDetail(transactionId, items) {
    items.map(async (item) => {
      await this.TransactionDetail.create({
        id: nanoid(),
        transaction_id: transactionId,
        product_id: item.product_id,
        quantity: item.quantity,
      });
    });
  }

  async updateTransactionStatus(details) {
    await this.Transaction.update(
      {
        midtrans_id: details.transaction_id,
        payment_type: details.payment_type,
        transaction_status: details.transaction_status,
        shipment_status: details.settlement_time ? 'Dikemas' : 'Belum dibayar',
        fraud_status: details.fraud_status,
        transaction_time: details.transaction_time,
        settlement_time: details.settlement_time,
      },
      { where: { id: details.order_id } },
    );
  }

  async updateShipmentStatus(transactionId, status) {
    const [isUpdated] = await this.Transaction.update(
      {
        shipment_status: status,
      },
      { where: { id: transactionId } },
    );
    return isUpdated;
  }

  async getUserIdFromTransaction(transactionId) {
    const userId = await this.Transaction.findOne({
      attributes: ['user_id'],
      where: { id: transactionId },
    });
    return userId;
  }

  async deleteTransaction(transactionId, userId) {
    const isDeleted = await this.Transaction.destroy({
      where: { id: transactionId, user_id: userId },
    });
    return isDeleted;
  }
}

module.exports = TransactionService;
