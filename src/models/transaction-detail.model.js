module.exports = (sequelize, Sequelize) => {
  const TransactionDetail = sequelize.define(
    'TransactionDetail',
    {
      id: {
        type: Sequelize.STRING(21),
        primaryKey: true,
      },
      transaction_id: {
        type: Sequelize.STRING(21),
        allowNull: false,
        onDelete: 'CASCADE',
        unique: 'compositeIndex',
        references: {
          model: 'Transaction',
          key: 'id',
        },
      },
      product_id: {
        type: Sequelize.STRING(21),
        allowNull: false,
        onDelete: 'CASCADE',
        unique: 'compositeIndex',
        references: {
          model: 'Product',
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'transaction_detail',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return TransactionDetail;
};
