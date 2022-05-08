const { Sequelize } = require('sequelize');

// MYSQL_HOST 127.0.0.1, MYSQL_PORT 3306, MYSQL_USER root, MYSQL_PWD Lc,.217917, MYSQL_DB my_node_ui
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = require('../config/config.default');
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql'
});

// seq
//   .authenticate()
//   .then(() => {
//     console.log('连接成功');
//   })
//   .catch((err) => {
//     console.log('连接失败', err);
//   });

module.exports = seq;
