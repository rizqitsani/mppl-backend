const db = require('../config/db');

class UserService {
  constructor() {
    this.User = db.sequelize.models.User;
  }

  async findUserByEmail(email) {
    const user = await this.User.findOne({
      where: { email },
    });

    return user;
  }

  async getStatistics() {
    const stats = await this.User.count();
    return stats;
  }
}

module.exports = UserService;
