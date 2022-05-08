const { goodsFormatError } = require('../constant/err.type');
const { getUserInfo } = require('../service/user.service');

const validateGood = async (ctx, next) => {
  try {
    ctx.verifyParams({
      good_name: {
        type: 'string',
        required: true
      },
      good_price: {
        type: 'number',
        required: true
      },
      good_num: {
        type: 'number',
        required: true
      },
      good_img: {
        type: 'string',
        required: true
      }
    });
  } catch (error) {
    goodsFormatError.result=error
    return ctx.app.emit('error', goodsFormatError, ctx);
  }
  await next();
};

module.exports = { validateGood };
