module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define(
    'Cart',
    {
      id: {
        type: Sequelize.STRING(21),
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING(21),
        allowNull: false,
        onDelete: 'CASCADE',
        unique: 'compositeIndex',
        references: {
          model: 'User',
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
      tableName: 'cart',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return Cart;
};
