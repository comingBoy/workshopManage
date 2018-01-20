var qcloud = require('../vendor/wafer2-client-sdk/index.js')
var config = require('../config')
var util = require('../utils/util.js')
var net = require('net.js')

module.exports = {
  //查看车间检查
  /*
  var data = {
  date: date,
  workshopId: app.globalData.currentWorkshopId
  }
  */
  getInspect: function (data, callback) {
    var data = data
    console.log(data)
    var configure = {
      url: config.service.getInspectUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      console.log(res)
      callback(res.data.result)
    })
  },
  //新建进度
  /*
  data = {
  workshopId: workshopId
  }
  */
  newProgress: function(data, callback) {
    var data = data
    var configure = {
      url: config.service.newProgressUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      if (res.data.result.status == 1) {
        if (res.data.result.allInspected == 0) {
          util.showModel('提示', '本轮尚有检查点未检查！')
        }
      } else {
        util.showModel('提示', '请求出错！')
      }
      callback(res.data.result)
    })
  },
  //车间状态检查历史
  getInspectHis: function(data, callback) {
    var data = data
    var configure = {
      url: config.service.getInspectHisUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  }
}

