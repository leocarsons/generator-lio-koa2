const Goods = require('../model/goods.model');

class GoodsService {
  async createGoodService(body) {
    const res = await Goods.create(body);
    return res.dataValues;
  }
  async updateGoodService(id, good) {
    const res = await Goods.update(good, {
      where: {
        id
      }
    });
    console.log(res);
    return res[0] > 0 ? true : false;
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
  async removeGoodService(id) {
    const res = await Goods.destroy({
      where: {
        id
      }
    });
    return res;
  }
  // 软删除
  async goodOffService(id) {
    const res = await Goods.destroy({
      where: {
        id
      }
    });
    return res;
  }
  async goodOnService(id) {
    const res = await Goods.restore({
      where: {
        id
      }
    });
    return res;
  }

  async getListService(pageSize, pageNum, query) {
    const offset = (pageNum - 1) * pageSize;
    const limit = pageSize * 1;
    const { count, rows } = await Goods.findAndCountAll({ where: { ...query }, offset, limit });
    console.log(rows);
    return { count, rows };
  }
}
module.exports = new GoodsService();
