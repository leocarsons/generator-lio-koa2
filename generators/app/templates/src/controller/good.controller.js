const path = require('path');

const {
  createGoodService,
  updateGoodService,
  removeGoodService,
  goodOffService,
  goodOnService,
  getListService
} = require('../service/good.service');
const { publishGoodsError, invalidGoodsID } = require('../constant/err.type');
class GoodController {
  async uploadImg(ctx) {
    const { file } = ctx.request.files;
    if (!file) return ctx.app.emit('error', { message: '上传失败', result: '' });
    ctx.body = {
      code: 0,
      message: '上传成功',
      result: {
        name: path.basename(file.path)
      }
    };
  }

  async createGood(ctx) {
    try {
      const { updatedAt, createdAt, ...res } = await createGoodService(ctx.request.body);
      ctx.body = {
        code: 0,
        message: '创建成功',
        result: res
      };
    } catch (error) {
      console.error(error);
      ctx.app.emit('error', publishGoodsError, ctx);
    }
  }

  async updateGood(ctx) {
    try {
      const res = await updateGoodService(ctx.params.id, ctx.request.body);
      if (!res) return ctx.app.emit('error', invalidGoodsID, ctx);
      ctx.body = { code: 0, message: '修改成功', result: '' };
    } catch (error) {
      console.error(error);
    }
  }

  async removeGood(ctx) {
    const { id } = ctx.request.params;
    const res = await await removeGoodService(id);
    if (!res) return ctx.app.emit('error', { message: '商品id无效' }, ctx);
    ctx.body = {
      code: 0,
      message: '删除成功',
      result: ''
    };
  }

  async goodOff(ctx) {
    const { id } = ctx.request.params;
    const res = await goodOffService(id);
    if (!res) return ctx.app.emit('error', invalidGoodsID, ctx);
    ctx.body = {
      code: 0,
      message: '商品下架成功',
      result: ''
    };
  }

  async goodOn(ctx) {
    const { id } = ctx.request.params;
    const res = await goodOnService(id);
    if (!res) return ctx.app.emit('error', invalidGoodsID, ctx);
    ctx.body = {
      code: 0,
      message: '商品上架成功',
      result: ''
    };
  }

  async getList(ctx) {
    try {
      const { pageSize, pageNum,...query } = ctx.request.query;
      const { count, rows } = await getListService(pageSize, pageNum,query);
      ctx.body = {
        pageSize,
        pageNum,
        count,
        list: rows
      };
    } catch (error) {
      console.error(error);
      ctx.app.emit('error', { message: '获取列表失败' }, ctx);
    }
  }
}

module.exports = new GoodController();
