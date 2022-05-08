const { updateById } = require('../service/user.service');

class UpdateController {
  async updatePassword(ctx, next) {
    const { id } = ctx.state.user;
    const { password } = ctx.request.body;
    try {
      await updateById({ id, password });
      ctx.body = {
        code:0,
        message: '修改成功'
      };
    } catch (error) {
      ctx.app.emit('error', { code:'503',message: '修改失败',result:'' }, ctx);
    }
  }
}

module.exports = new UpdateController();
