const Router = require('koa-router');
const router = new Router({ prefix: '/update' });

const { cryptPassword } = require('../middleware/user.middleware');


const { updatePassword } = require('../controller/update.controller');
const { updatePasswordService,parameterPwd } = require('../middleware/update.middleware');

router.post('/password',parameterPwd, updatePasswordService, cryptPassword, updatePassword);
module.exports = router;
