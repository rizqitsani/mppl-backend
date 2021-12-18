const { format, parse } = require('date-fns');
const { nanoid } = require('nanoid');

const config = require('../config');

module.exports = (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define(
    'RefreshToken',
    {
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
    },
    {
      tableName: 'refresh_token',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  RefreshToken.createToken = async function createToken(user) {
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.refreshTokenExpire);
    const formattedExpiredAt = format(expiredAt, 'yyyy-MM-dd HH:mm:ss');

    const ifExist = await this.findOne({
      where: { user_id: user.id },
    });

    if (ifExist) {
      const token = nanoid();
      await this.update(
        {
          token,
          expiry_date: formattedExpiredAt,
        },
        {
          where: { user_id: user.id },
        },
      );

      return token;
    }

    const refreshToken = await this.create({
      id: nanoid(),
      token: nanoid(),
      user_id: user.id,
      expiry_date: formattedExpiredAt,
    });

    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token) =>
    parse(token.expiry_date, 'yyyy-MM-dd HH:mm:ss', new Date()).getTime() <
    new Date().getTime();

  return RefreshToken;
};
