module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: Sequelize.STRING(21),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: 'product',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return Product;
};
