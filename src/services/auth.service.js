const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const config = require('../config');
const db = require('../config/db');
const ApiError = require('../errors/ApiError');
const { comparePassword } = require('../utils/auth');

const UserService = require('./user.service');

class AuthService {
  constructor() {
    this.User = db.sequelize.models.User;
    this.UserService = new UserService();
  }

  async login(userCredentials) {
    const user = await this.UserService.findUserByEmail(userCredentials.email);

    if (!user) {
      throw new ApiError({
        status: StatusCodes.NOT_FOUND,
        message: 'Pengguna tidak ditemukan!',
      });
    }

    const isPasswordValid = await comparePassword(
      userCredentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ApiError({
        status: StatusCodes.UNAUTHORIZED,
        message: 'Password salah!',
      });
    }

    const token = this.createToken(user.id);

    return token;
  }

  async register(userData) {
    const isEmailExist = await this.UserService.findUserByEmail(userData.email);

    if (isEmailExist) {
      throw new ApiError({
        status: StatusCodes.BAD_REQUEST,
        message: 'Email telah digunakan!',
      });
    }

    const data = await db.sequelize.models.User.create({
      id: nanoid(),
      ...userData,
    });

    return data;
  }

  createToken(id) {
    return jwt.sign({ id }, config.jwtSecret, {
      expiresIn: parseInt(config.jwtExpire, 10),
    });
  }
}

module.exports = AuthService;
