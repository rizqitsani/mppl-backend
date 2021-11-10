module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      us_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      us_nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      us_no_hp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      us_alamat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      us_email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      us_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
