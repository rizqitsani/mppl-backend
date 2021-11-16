const path = require('path');
const fs = require('fs');
const { createRequire } = require('module');
const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig');

const config = dbConfig[process.env.NODE_ENV || 'development'];
const modelDir = path.join(__dirname, '../models');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    timezone: '+07:00',
  },
);

const db = {};

fs.readdirSync(modelDir)
  .filter((file) => file.indexOf('.') !== 0 && file.slice(-9) === '.model.js')
  .forEach((file) => {
    const entity = createRequire(path.join(modelDir, file));
    const model = entity(`./${file}`)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
