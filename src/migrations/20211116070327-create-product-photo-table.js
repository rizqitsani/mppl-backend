module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_photo', {
      id: {
        type: Sequelize.STRING(21),
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.STRING(21),
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Product',
          key: 'id',
          as: 'product_id',
        },
      },
      photo_link: {
        type: Sequelize.STRING,
        unique: true,
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
    await queryInterface.dropTable('product_photo');
  },
};
