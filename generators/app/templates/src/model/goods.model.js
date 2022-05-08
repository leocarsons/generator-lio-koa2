const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Goods = seq.define(
  'ev_good',
  {
    // 定义模型属性id自动创建为主键自增 ,createdAt创建时间   updatedAt更新时间
    good_name: {
      type: DataTypes.STRING(45),
      allowNull: false, //不能为空
      comment: '商品名称'
    },
    good_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, //不能为空
      comment: '商品价格'
    },
    good_num: {
      type: DataTypes.INTEGER, //整型
      allowNull: false,
      comment: '商品库存数量'
    },
    good_img: {
      type: DataTypes.STRING(45),
      allowNull: false, //不能为空
      comment: '商品图片url'
    }
  },
  {
    paranoid: true
  }
);

// 生成表
// Goods.sync({ force: true });

module.exports = Goods;
