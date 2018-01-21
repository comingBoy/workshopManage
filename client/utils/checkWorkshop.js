var qcloud = require('../vendor/wafer2-client-sdk/index.js')
var config = require('../config')
var util = require('../utils/util.js')
var net = require('net.js')

module.exports = {

  //获取隐患表
  getError: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.getErrorUrl,
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

  //获取修复信息
  /*
  data = {
    inspectId: inspectId
  }
  */
  getFix: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.getFixUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      console.log(res)
      if (res.data.result.status == 1) {
      } else if (res.data.result.status == -1) {
        util.showModel('提示', '获取失败，请重试！')
      } else {
        util.showModel('提示', '请求出错！')
      }
      callback(res.data.result)
    })
  },
}

