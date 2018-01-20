var qcloud = require('../vendor/wafer2-client-sdk/index.js')
var config = require('../config')
var util = require('../utils/util.js')
var net = require('net.js')

module.exports = {

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
      callback(res.data.result)
    })
  }
}

