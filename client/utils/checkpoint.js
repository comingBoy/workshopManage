//client/utils/checkpoint.js
var qcloud = require('../vendor/wafer2-client-sdk/index.js')
var config = require('../config')
var util = require('../utils/util.js')
var net = require('net.js')

module.exports = {
  getCheckpoint: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.getCheckpointUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },

  getCheckpoint0: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.getCheckpoint0Url,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },

  changeCheckpointInfo: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.changeCheckpointInfoUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },

  delCheckpoint: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.delCheckpointUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },

  newCheckpoint: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.newCheckpointUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },

  getCheckDetail: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.getCheckDetailUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },
}