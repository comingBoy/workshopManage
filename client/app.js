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

  },
    
})