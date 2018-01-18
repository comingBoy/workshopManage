// client/utils/login.js
//用户登录并获取openId
var qcloud = require('../vendor/wafer2-client-sdk/index.js')
var util = require('./util.js')
var config = require('../config.js')
module.exports = {
  login: function (logged, callback) {
    var res = {
      userInfo: null,
      logged: false
    }
    if (logged) return

    util.showBusy('正在登录')
    qcloud.login({
      success(result) {
        qcloud.request({
          url: config.service.requestUrl,
          login: true,
          success(result) {
            util.showSuccess('登录成功')
            res.userInfo = result.data.data,
              wx.setStorageSync('openId', res.userInfo.openId)
            res.logged = true,
              callback(res)
          },

          fail(error) {
            util.showModel('请求失败', error)
            console.log('request fail', error)
            callback(res)
          }
        })
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
        callback(res)
      }
    })
  },
}