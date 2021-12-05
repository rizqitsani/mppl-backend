module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaction', {
      id: {
        type: Sequelize.STRING(21),
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING(21),
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
        },
      },
      midtrans_id: { type: Sequelize.STRING },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      shipping_cost: { type: Sequelize.INTEGER, allowNull: false },
      insurance_cost: { type: Sequelize.INTEGER, allowNull: false },
      payment_type: {
        type: Sequelize.STRING,
      },
      transaction_type: {
        type: Sequelize.STRING,
      },
      transaction_status: {
        type: Sequelize.STRING,
      },
      shipping_status: {
        type: Sequelize.STRING,
      },
      fraud_status: {
        type: Sequelize.STRING,
      },
      transaction_time: {
        type: Sequelize.DATE,
      },
      settlement_time: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('transaction');
  },
};
