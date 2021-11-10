const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig');

const config = dbConfig[process.env.NODE_ENV || 'development'];

const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

module.exports = db;
