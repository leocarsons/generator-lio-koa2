const User = require('../model/user.model');

class UserService {
  async createUser(body) {
    const res = await User.create(body);
    return res;
  }
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    });
    return res ? res.dataValues : null;
 
  }
  updateById({ id, user_name, password, is_admin }) {
    const whereOpt = { id };
    const newUser = {};
    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });
    User.update(newUser, {
      where: whereOpt
    });
  }
}
module.exports = new UserService();
