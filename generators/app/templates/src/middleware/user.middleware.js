const bcrypt = require('bcryptjs'); //用于对密码的加密解密
const { getUserInfo } = require('../service/user.service');
const {
  userFormateError,
  userAlreadyExited,
  userDoesNotExist,
  userLoginError,
  invalidPassword
} = require('../constant/err.type');
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  const res = await getUserInfo({ user_name });
  if (res) {
    ctx.app.emit('error', userAlreadyExited, ctx);
  } else {
    await next();
  }
};

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  //bcrypt.genSaltSync加盐加密
  // hash就是加密之后的密码
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  ctx.request.body.password = hash;
  await next();
};
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });
    if (res === null) {
      return ctx.app.emit('error', userDoesNotExist, ctx);
    }
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit('error', invalidPassword, ctx);
    }
  } catch (error) {
    return ctx.aap.emit('error', userLoginError, ctx);
  }
  await next();
};
module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
};
