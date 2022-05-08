const jwt = require('jsonwebtoken');
const { createUser, getUserInfo, updateById } = require('../service/user.service');
const { JWT_SECRET } = require('../config/config.default');

class UserController {
  async login(ctx, next) {
    try {
      const { user_name } = ctx.request.body;
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
        }
      };
    } catch (error) {
      console.error(error);
    }
  }
  async register(ctx, next) {
    const res = await createUser(ctx.request.body);
    const { id, user_name } = res.dataValues;
    ctx.body = { id, user_name, message: '注册成功' };
  }
}

module.exports = new UserController();
