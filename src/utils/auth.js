const bcrypt = require('bcrypt');

const comparePassword = async (password, dbPassword) =>
  bcrypt.compare(password, dbPassword);

const hashPassword = async (password) => bcrypt.hash(password, 10);

module.exports = {
  comparePassword,
  hashPassword,
};
