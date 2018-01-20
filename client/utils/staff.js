var util = require('./util.js')
var config = require('../config.js')
var net = require("./net.js")
module.exports = {
  //验证数据库中是否有该用户信息
  verifyUserInfo: function (openId, urls, callback) {
    var data = {
      openId: openId
    }
    var configure = {
      url: config.service.verifyUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      if (res.data.result.status == 1) {
        wx.redirectTo({
          url: urls.index,
        })
      } else if (res.data.result.status == -1) {
        wx.showModal({
          title: '提示',
          content: '当前未注册！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: urls.register,
              })
            }
          }
        })
      } else {
        util.showModel('提示', '请求出错！')
      }
      callback(res.data.result.res)
    })
  },
  //用户注册
  register: function (data, urls, callback) {
    var data = data
    var configure = {
      url: config.service.registerUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    if (data.name) {
      if (data.sex) {
        if (data.staffId) {
          if (data.telNum) {
            net.request(data, configure, function (res) {
              if (res.data.result.status == 1) {
                wx.showModal({
                  title: '提示',
                  content: '注册成功',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: urls.functions,
                      })
                    }
                  }
                })
              } else if (res.data.result.status == -1) {
                util.showModel('提示', '注册失败，请重试！')
              } else {
                util.showModel('提示', '请求出错！')
              }
              callback(res.data)
            })
          } else {
            util.showModel('提示', '联系方式不能为空！')
          }
        } else {
          util.showModel('提示', '工号不能为空！')
        }
      } else {
        util.showModel('提示', '性别不能为空！')
      }
    } else {
      util.showModel('提示', '姓名不能为空！')
    }
  },
  //修改用户信息
  modifyUserInfo: function (data, callback) {
    var data = data
    var configure = {
      url: config.service.modifyUserInfoUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    if (data.name) {
      if (data.sex) {
        if (data.staffId) {
          if (data.telNum) {
            net.request(data, configure, function (res) {
              if (res.data.result.status == 1) {
                wx.showModal({
                  title: '提示',
                  content: '修改成功',
                  showCancel: false,
                  success: function (res) {
                    callback()
                  }
                })
              } else if (res.data.result.status == -1) {
                util.showModel('提示', '修改失败，请重试！')
              } else {
                util.showModel('提示', '请求出错！')
              }
            })
          } else {
            util.showModel('提示', '联系方式不能为空！')
          }
        } else {
          util.showModel('提示', '工号不能为空！')
        }
      } else {
        util.showModel('提示', '性别不能为空！')
      }
    } else {
      util.showModel('提示', '姓名不能为空！')
    }
  },
  //查看用户信息
  getUserInfo: function (data, callback) {
    var data = {
      data: data
    }
    var configure = {
      url: config.service.getUserInfoUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }
    net.request(data, configure, function (res) {
      if (res.data.result.status == 1) {
      } else if (res.data.result.status == -1) {
        util.showModel('提示', '获取失败！')
      } else {
        util.showModel('提示', '请求出错！')
      }
      callback(res.data.result.res)
    })
  },
  
}