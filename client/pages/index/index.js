//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var staff = require('../../utils/staff.js')
var login = require('../../utils/login.js')

Page({
    data: {
        
    },
    onLoad() {
      var that = this
      qcloud.setLoginUrl(config.service.loginUrl)
      login.login(getApp().globalData.logged, function (res) {
        getApp().globalData.logged = res.logged
        getApp().globalData.userInfo = res.userInfo
        var urls = {
          index: "../index0/index0",
          register: "../register/register"
        }
        staff.verifyUserInfo(getApp().globalData.userInfo.openId, urls, function (res) {
          if (res.length != 0) {
            getApp().globalData.myInfo = res[0]
          }
        })
      })
    },
})
