/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

router.get('/getAllGroup', controllers.group.getAllGroup)

router.post('/newGroup', controllers.group.newGroup)

router.post('/verify', controllers.staff.verify)

router.post('/register', controllers.staff.register)

router.post('/modifyUserInfo', controllers.staff.modifyUserInfo)

router.post('/uploadImg', controllers.uploadImg)

router.post('/verifyStaff', controllers.group.verifyStaff)

router.post('/joinGroup', controllers.group.joinGroup)

router.post('/getStaff', controllers.group.getStaff)

router.post('/delStaff', controllers.group.delStaff)

router.post('/getGroupWorkshop', controllers.workshop.getGroupWorkshop)

router.post('/newWorkshop', controllers.workshop.newWorkshop)

router.post('/getInspect', controllers.inspect.getInspect)

router.post('/getMyWorkshop', controllers.workshop.getMyWorkshop)

router.post('/newProgress', controllers.inspect.newProgress)

router.post('/getInspectHis', controllers.inspect.getInspectHis)

router.post('/getCheckpoint', controllers.checkpoint.getCheckpoint)

router.post('/getCheckpoint0', controllers.checkpoint.getCheckpoint0)

router.post('/getError', controllers.workshop.getError)

router.post('/fixError', controllers.inspect.fixError)

router.post('/inspect', controllers.inspect.inspect)

router.post('/inspect0', controllers.inspect.inspect0)

router.post('/getFix', controllers.workshop.getFix)

router.post('/getTimes', controllers.times.getTimes)

router.post('/getInspectById', controllers.inspect.getInspectById)

router.post('/getWorkshopInfo', controllers.workshop.getWorkshopInfo)

router.post('/changeWorkshopInfo', controllers.workshop.changeWorkshopInfo)

router.post('/changeCheckpointInfo', controllers.checkpoint.changeCheckpointInfo)

router.post('/delWorkshop', controllers.workshop.delWorkshop)

router.post('/delCheckpoint', controllers.checkpoint.delCheckpoint)

router.post('/newCheckpoint', controllers.checkpoint.newCheckpoint)

router.post('/delGroup', controllers.group.delGroup)

router.post('/modifyGroup', controllers.group.modifyGroup)

router.post('/changeOpenId', controllers.workshop.changeOpenId)

router.post('/getCheckDetail', controllers.checkpoint.getCheckDetail)

router.post('/setLevel', controllers.group.setLevel)

router.post('/getInspectTimes', controllers.inspect.getInspectTimes)

router.post('/getLastInspect', controllers.inspect.getLastInspect)

router.post('/getSuperior', controllers.group.getSuperior)

router.post('/getMessage', controllers.staff.getMessage)
module.exports = router
