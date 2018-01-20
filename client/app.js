//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var login = require('./utils/login.js')
var config = require('./config')
var staff = require('./utils/staff.js')
var inspect = require('./utils/inspect.js')

App({
  globalData: {
    logged: false,
    userInfo: null,
    myInfo: null
  },
  onLaunch: function () {
    var that = this
    qcloud.setLoginUrl(config.service.loginUrl)
    login.login(that.globalData.logged,function(res){
      that.globalData.logged = res.logged
      that.globalData.userInfo = res.userInfo
      var urls = {
        index: "../index0/index0",
        register: "../register/register"
      }  
      staff.verifyUserInfo(that.globalData.userInfo.openId, urls, function (res){
        if(res.length != 0){
          that.globalData.myInfo = res[0]
        }
      })
    })
  },
    
})