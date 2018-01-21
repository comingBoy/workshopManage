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
  /*
  data = {
    date: date,
    workshopId: workshopId
  }
  */
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
  //修复隐患
  /*
  data = {
    inspectId : inspectId,
    date : date,
    describtion : describtion,
    photo
  }

  urls = {
    checkWorkshop : checkWorkshop
  }
  */
  fixError: function (data, urls) {
    var data = data
    console.log(data)
    var configure = {
      url: config.service.fixErrorUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      console.log(res)
      if (res.data.result.status == 1) {
        wx.showModal({
          title: '提示',
          content: '修复报告提交成功！',
          showCancel: false,
          success: function (res) {
            wx.redirectTo({
              url: urls.checkWorkshop,
            })
          }
        })
      } else if (res.data.result.status == 0) {
        util.showModel('提示', '数据库异常！')
      }
      else if (res.data.result.status == -1) {
        util.showModel('提示', '获取失败，请重试！')
      } else {
        util.showModel('提示', '请求出错！')
      }
    })
  },

  //检查
  /*
  data = {
    inspectArray: inspectArray
  }
  */
  Inspect: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.InspectUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      console.log(res)
      if (res.data.result.status == 1) {
        wx.showModal({
          title: '提示',
          content: '检查报告提交成功！',
          showCancel: false,
          success: function (res) {
          }
        })
      } else if (res.data.result.status == 0) {
        util.showModel('提示', '数据库异常！')
      }
      else if (res.data.result.status == -1) {
        util.showModel('提示', '获取失败，请重试！')
      } else {
        util.showModel('提示', '请求出错！')
      }
      callback(res.data.result)
    })
  },
}

