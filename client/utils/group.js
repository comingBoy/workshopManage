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
      var group = res.data.result.res
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
  //新建部门
  newGroup: function(data, urls, callback) {
    if (data.groupName) {
      if (data.adminId) {
        if (data.groupCode){
          var data = data
          console.log(data)
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
              wx.showModal({
                title: '提示',
                content: '创建成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.reLaunch({
                      url: urls,
                    })
                  }
                }
              })
            } else if (res.data.result.status == -1) {
              util.showModel('提示', '创建失败，请重试！')
            } else {
              util.showModel('提示', '请求出错！')
            }
            callback(res.data.result)
          })
        }
        else {
          util.showModel('提示', '部门码不能为空！')
        }
      }
      else {
        util.showModel('提示', '未知用户！')
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
      console.log(res)
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
    console.log(data)
    var data = data
    var configure = {
      url: config.service.getStaffUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      if (res.data.result.status == 1) {
      } else if (res.data.result == 0) {
        util.showModel('提示', '尚无员工！')
      } else if (res.data.result == -1) {
        util.showModel('提示', '获取失败，请重试！')
      } else {
        util.showModel('提示', '请求出错！')
      }
      callback(res.data.result.res)
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
      if (res.data.result.affectedRows == 1){
        util.showModel('提示', '删除成功！')
        callback(res)
      }
      else{
        util.showModel('提示', '删除失败！')
        callback(res)
      }
    })
  },                    

}