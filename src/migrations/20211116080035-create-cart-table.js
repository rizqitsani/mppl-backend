module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart', {
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
    await queryInterface.dropTable('cart');
  },
};
