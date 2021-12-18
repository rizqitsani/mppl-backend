module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('refresh_token', {
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
      token: {
        type: Sequelize.STRING(21),
        unique: true,
        allowNull: false,
      },
      expiry_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('refresh_token');
  },
};
