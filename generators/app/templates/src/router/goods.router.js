const Router = require('koa-router');

const { uploadImg ,createGood,updateGood,removeGood,goodOff,goodOn,getList} = require('../controller/good.controller');
const {validateGood} =require('../middleware/goods.middleware')

const router = new Router({ prefix: '/goods' });

router.post('/upload', uploadImg);
router.post('/create',validateGood, createGood);
router.put('/:id',validateGood, updateGood);
// 硬删除
router.delete('/:id',removeGood)
// 下架
router.post('/:id/off',goodOff)
// 上架
router.post('/:id/on',goodOn)
// 查询列表
router.get('/list',getList)

module.exports = router;
