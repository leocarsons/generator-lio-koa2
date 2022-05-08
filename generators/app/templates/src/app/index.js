
const path = require('path');

const Koa = require('koa2');
const koaStatic = require('koa-static');
const KoaBody = require('koa-body');
const jwt = require('koa-jwt');
const parameter=require('koa-parameter')

const userRouter = require('../router');
const errHandler = require('./errHandler');
const { tokenError } = require('./tokenError');
const { JWT_SECRET } = require('../config/config.default');

const app = new Koa();

// 验证token
app.use(tokenError);
app.use(jwt({ secret: JWT_SECRET }).unless({ path: [/^\/user/] }));

// 用于解析请求体参数
app.use(
  KoaBody({ multipart: true, formidable: { uploadDir: path.join(__dirname, '../upload'), keepExtensions: true } })
);

//用于开放静态资源
app.use(koaStatic(path.join(__dirname, '../upload')));

//用于抛出错误
const KoaJsonError = require('koa-json-error');
app.use(KoaJsonError());

// 验证参数
app.use(parameter(app))

// 挂载路由
app.use(userRouter.routes()).use(userRouter.allowedMethods());

// 监听error错误
app.on('error', errHandler);

module.exports = app;
