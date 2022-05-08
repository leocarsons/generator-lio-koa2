const bcrypt = require('bcryptjs');

const { invalidParams, invalidPassword, userDoesNotExist } = require('../constant/err.type');
const { getUserInfo } = require('../service/user.service');

const updatePasswordService = async (ctx, next) => {
  const { oldPassword } = ctx.request.body;
  const { id } = ctx.state.user;
  const user = await getUserInfo({ id });
  if (!user) return ctx.app.emit('error', userDoesNotExist, ctx);
  if (!bcrypt.compareSync(oldPassword, user.password)) return ctx.app.emit('error', invalidPassword, ctx);
  await next();
};

const parameterPwd = async (ctx, next) => {
  try {
    const { oldPassword, password } = ctx.request.body;
    if (oldPassword === password) throw new Error('新旧密码不能一样');
    ctx.verifyParams({
      oldPassword: {
        type: 'string',
        required: true,
        format: /^[a-z0-9_-]{3,15}$/
      },
      password: {
        type: 'string',
        required: true,
        format: /^[a-z0-9_-]{3,15}$/
      }
    });
  } catch (error) {
    invalidParams.result = error.message === '新旧密码不能一样' ? error.message : error;
    return ctx.app.emit('error', invalidParams, ctx);
  }
  await next();
};
module.exports = {
  updatePasswordService,
  parameterPwd
};
