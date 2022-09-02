const Router = require('koa-router');
const user = new Router({ prefix: '/user' });
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware');

const validate=require('koa2-validation')
// 挂载user的控制器
const { login, register, updatePassword } = require('../controller/user.controller');
// const res = require('express/lib/response');
user.post('/login', userValidator, verifyLogin, login);
user.post('/register', userValidator, verifyUser, cryptPassword, register);

module.exports = user;
