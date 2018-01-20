//client/utils/workshop.js
var qcloud = require('../vendor/wafer2-client-sdk/index.js')
var config = require('../config')
var util = require('../utils/util.js')
var net = require('net.js')

module.exports = {
  //查看部门负责车间
  getGroupWorkshop: function(data, callback) {
    var data = data
    console.log(data)
    var configure = {
      url: config.service.getGroupWorkshopUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      console.log(res)
      if (res.data.result.status == 1) {
      } else if (res.data.result.status == 0) {
        wx.showModal({
          title: '提示',
          content: '尚无车间',
          showCancel: false,
          success: function (res) {
          }
        })
      }
      else if (res.data.result.status == -1) {
        util.showModel('提示', '获取失败，请重试！')
      } else {
        util.showModel('提示', '请求出错！')
      }
      callback(res.data.result.res)
    })
  },
  //新建车间
  /* 
  data = {
  workshopName: workshopName,
  groupId: groupId,
  checkpointNum: 0,
  times: 0
  }
  urls = {
  groupIndex: '../groupIndex/groupIndex?id=' + groupId
  }
  */
  newWorkshop: function(data, urls){
    var data = data
    console.log(data)
    var configure = {
      url: config.service.newWorkshopUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    if (data.workshopName) {
      if (data.groupId) {
        if (data.checkpointNum) {
          if (data.times) {
            net.request(data, configure, function (res) {
              console.log(res)
              if (res.data.result.status == 1) {
                wx.showModal({
                  title: '提示',
                  content: '新建成功',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.reLaunch({
                        url: urls.groupIndex,
                      })
                    }
                  }
                })
              } else if (res.data.result.status == -1) {
                util.showModel('提示', '新建失败，请重试！')
              } else if (res.data.result.status == 2) {
                util.showModel('提示', '新建失败，请重试！')
              } else if (res.data.result.status == -2 || res.data.result.status == 3) {
                util.showModel('提示', '回滚失败，请从数据库删除或联系开发人员！')
              } else {
                util.showModel('提示', '请求出错！')
              }
            })
          } else {
            util.showModel('提示', '检查点数不能为空！')
          }
        } else {
          util.showModel('提示', '检查次数不能为空！')
        }
      } else {
        util.showModel('提示', '未知部门！')
      }
    } else {
      util.showModel('提示', '车间名不能为空！')
    }
  },

  getMyWorkshop: function(data, callback){
    var data = data
    console.log(data)
    var configure = {
      url: config.service.getMyWorkshopUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result.res)
    })
  },

  //获取已完成次数记录
  /*
    data = {
      date: date,
      
    }
  */
  getTimes: function (data, callback) {
    var data = data
    console.log(data)
    var configure = {
      url: config.service.getMyWorkshopUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result.res)
    })
  },

}