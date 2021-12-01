const path = require('path');
const fs = require('fs');
const { createRequire } = require('module');
const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig');
const configVars = require('.');

const config = dbConfig[configVars.env];
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

db.Product.hasMany(db.ProductPhoto, { as: 'photos', foreignKey: 'product_id' });
db.ProductPhoto.belongsTo(db.Product, { foreignKey: 'product_id' });

db.User.hasMany(db.Cart, { foreignKey: 'user_id' });
db.Cart.belongsTo(db.User, { as: 'user', foreignKey: 'user_id' });

db.Product.hasMany(db.Cart, { foreignKey: 'product_id' });
db.Cart.belongsTo(db.Product, { as: 'product', foreignKey: 'product_id' });

db.Transaction.hasMany(db.TransactionDetail, {
  as: 'items',
  foreignKey: 'transaction_id',
});
db.TransactionDetail.belongsTo(db.Transaction, {
  foreignKey: 'transaction_id',
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
