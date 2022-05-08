const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const User = seq.define('ev_user', {
  // 定义模型属性id自动创建为主键自增 ,createdAt创建时间   updatedAt更新时间
  user_name: {
    type: DataTypes.STRING(45),
    allowNull: false, //不能为空
    unique: true, //值是唯一的
    comment: '用户名 必填 唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false, //不能为空
    comment: '密码不能为空'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0, //默认值0
    comment: '是否为管理员  0(默认普通用户),1管理员'
  }
},{
  paranoid: true,
});

// 生成表
// seq.sync({force:true})

module.exports = User;
