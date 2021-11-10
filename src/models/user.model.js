module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
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
    },
    { tableName: 'users' },
  );

  return User;
};
