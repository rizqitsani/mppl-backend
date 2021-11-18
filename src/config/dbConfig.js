const config = require('.');

module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'mppl_silvery',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'mppl_silvery',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    dialect: config.database.dialect,
  },
};
