const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRES_IN,
  refreshTokenExpire: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
  midtransClientKey: process.env.MIDTRANS_CLIENT_KEY,
  midtransServerKey: process.env.MIDTRANS_SERVER_KEY,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
  },
};
