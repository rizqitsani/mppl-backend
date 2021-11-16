const { hashPassword } = require('../utils/auth');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: Sequelize.STRING(21),
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telephone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'user',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeCreate: async (atttributes) => {
          if (atttributes.us_password) {
            // eslint-disable-next-line no-param-reassign
            atttributes.us_password = await hashPassword(
              atttributes.us_password,
            );
          }
        },
      },
    },
  );

  return User;
};
