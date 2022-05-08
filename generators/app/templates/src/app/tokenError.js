
const {invalidToken} =require('../constant/err.type.js')

const tokenError=async (ctx, next) => {
    await next().catch((err) => {
      console.log(err.name)
      if (err.name === 'UnauthorizedError') {
        ctx.app.emit('error', err, ctx);
      }
    });
    
  }

  module.exports={tokenError}