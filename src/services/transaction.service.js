const { nanoid } = require('nanoid');
const db = require('../config/db');

class TransactionService {
  constructor() {
    this.Transaction = db.sequelize.models.Transaction;
    this.TransactionDetail = db.sequelize.models.TransactionDetail;
  }

  async addTransaction(userId, cost) {
    const transaction = await this.Transaction.create({
      id: nanoid(),
      user_id: userId,
      total: cost.total,
      additional_cost: cost.additional,
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
        fraud_status: details.fraud_status,
        transaction_time: details.transaction_time,
        settlement_time: details.settlement_time,
      },
      { where: { id: details.order_id } },
    );
  }

  async getUserIdFromTransaction(transactionId) {
    const userId = await this.Transaction.findOne({
      attributes: ['user_id'],
      where: { id: transactionId },
    });
    return userId;
  }

  async deleteTransaction(transactionId) {
    const isDeleted = await this.Transaction.destroy({
      where: { id: transactionId },
    });
    return isDeleted;
  }
}

module.exports = TransactionService;
