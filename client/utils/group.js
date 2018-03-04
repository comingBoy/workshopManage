var util = require("./util.js")
var config = require("../config.js")
var net = require("./net.js")

module.exports = {
  //获得所有部门
  getAllGroup: function(callback){
    var data = {data:""}
    var configure = {
      url: config.service.getAllGroupUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      if (res.data.result.status == 1) {
      } else if (res.data.result.status == 0) {
        util.showModel('提示', '当前无部门！')
      } else if (res.data.result.status == -1) {
        util.showModel('提示', '获取失败，请重试！')
      } else {
        util.showModel('提示', '请求出错！')
      }
      callback(res.data.result.res)
    })
  },

  getMyGroup: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.getMyGroupUrl,
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

  getSuperior: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.getSuperiorUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },
  //新建部门
  newGroup: function(data) {
    if (data.groupName) {
      if (data.groupCode){
        var data = data
        var configure = {
          url: config.service.newGroupUrl,
          method: 'POST',
          header: {
            'content-type': 'application/json'
          }
        }
        net.request(data, configure, function (res) {
          console.log(res)
          if (res.data.result.status == 1) {
            var group = res.data.result.res
            wx.showModal({
              title: '提示',
              content: '创建成功',
              showCancel: false,
              success: function (res) {
                getApp().globalData.currentGroup = group
                if (res.confirm) {
                  wx.reLaunch({
                    url: '../group/group',
                  })
                }
              }
            })
          } else if (res.data.result.status == -1) {
            util.showModel('提示', '创建失败，请重试！')
          } else {
            util.showModel('提示', '请求出错！')
          }
        })
      }
      else {
        util.showModel('提示', '部门码不能为空！')
      }
    }
    else {
      util.showModel('提示', '部门名不能为空！')
    }
  },
  //加入部门
  joinGroup: function (data, urls) {
    var data = data
    var configure = {
      url: config.service.joinGroupUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    if (data.groupCode) {
      net.request(data, configure, function (res) {
        if (res.data.result.status == 1) {
          wx.showModal({
            title: '提示',
            content: '加入成功！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: urls.groupIndex,
                })
              }
            }
          })
        } else if (res.data.result.status == 0) {
          util.showModel('提示', '部门码错误，请重试！')
        } else if (res.data.result.status == -1) {
          util.showModel('提示', '请求出错，请重试！')
        } else {
          util.showModel('提示', '请求出错！')
        }
      })
    } else {
      util.showModel('提示', '部门码不能为空！')
    }
  },
  //验证是否加入部门
  verifyStaff: function (data, urls) {
    var data = data
    var configure = {
      url: config.service.verifyStaffUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      if (res.data.result.status == 1) {
        wx.showModal({
          title: '提示',
          content: '您不在部门中,请申请！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: urls.joinGroup,
              })
            }
          }
        })     
      } else if (res.data.result.status == -1) { 
        wx.reLaunch({
          url: urls.groupIndex,
        }) 
      } else {
        util.showModel('提示', '请求出错！')
      }
    })
  },
  //查看部门成员
  getStaff: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.getStaffUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },                                                           
  //删除部门成员
  delStaff: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.delStaffUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },      

  delGroup: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.delGroupUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },      

  modifyGroup: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.modifyGroupUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      callback(res.data.result)
    })
  },

  setLevel: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.setLevelUrl,
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