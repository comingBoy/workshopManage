// pages/member/member.js
var group = require('../../utils/group.js')
var util = require('../../utils/util.js')
var staff = require('../../utils/staff.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffList: [],
    superiorList: [],
    adminList: null,
    isAdmin: false,
    isSuperior: false,
    hideMessage: true,
    message: ''
  },

  refresh: function () {
    var that = this
    var isSuperior = false
    if (getApp().globalData.myInfo.openId == getApp().globalData.currentGroup.adminId) {
      that.setData({
        isAdmin: true
      })
    }
    var data = {
      groupId: getApp().globalData.currentGroup.groupId
    }
    group.getSuperior(data, function (res) {
      if (res.status == 1) {
        for (var i = 0; i < res.res; i++) {
          if (getApp().globalData.myInfo.openId == res.res[i]) {
            isSuperior = true
            break
          }
        }
        that.setData({
          isSuperior: isSuperior
        })
      } else if (res.status == 0) {
        that.setData({
          isSuperior: isSuperior
        })
      } else if (res.status == -1) {
        util.showModel("提示", "请求失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
    group.getStaff(data, function (res) {
      if (res.status == 1) {
        that.setData({
          staffList: res.staff,
          adminList: res.admin,
          superiorList: res.superior,
        })
      } else if (res.status == -1) {
        util.showModel("提示", "获取失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
      wx.hideLoading()
    })
  },

  deleteStaff:function(e){
    var that = this
    var data = {
      openId: that.data.staffList[e.currentTarget.id].openId,
      groupId: getApp().globalData.currentGroup.groupId
    }
    group.delStaff(data, function (res) {
      if (res.status == 1) {
        that.refresh()
      } else if (res.status == -1) {
        util.showModel("提示", "删除失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
  },

  deleteSuperior: function (e) {
    var that = this
    var data = {
      openId: that.data.superiorList[e.currentTarget.id].openId,
      groupId: getApp().globalData.currentGroup.groupId
    }
    group.delStaff(data, function (res) {
      if (res.status == 1) {
        that.refresh()
      } else if (res.status == -1) {
        util.showModel("提示", "删除失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
  },

  setStaff: function (e) {
    var that = this
    var data = {
      openId: that.data.superiorList[e.currentTarget.id].openId,
      groupId: getApp().globalData.currentGroup.groupId,
      label: 1
    }
    group.setLevel(data, function (res) {
      if (res.status == 1) {
        wx.showLoading({
          title: '读取中',
        })
        that.refresh()
      } else if (res.status == -1) {
        util.showModel("提示", "设置失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
  },

  setSuperior: function (e) {
    var that = this
    var data = {
      openId: that.data.staffList[e.currentTarget.id].openId,
      groupId: getApp().globalData.currentGroup.groupId,
      label: 2
    }
    group.setLevel(data, function (res) {
      if (res.status == 1) {
        wx.showLoading({
          title: '读取中',
        })
        that.refresh()
      } else if (res.status == -1) {
        util.showModel("提示", "设置失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
  },

  leaveMessage: function (e) {
    var message = this.data.message
    message.staffId = this.data.adminList[e.currentTarget.id].openId
    this.setData({
      hideMessage: false
    })
  },

  leaveMessage0: function (e) {
    var message = this.data.message
    message.staffId = this.data.staffList[e.currentTarget.id].openId
    this.setData({
      hideMessage: false
    })
  },

  getMessage: function (e) {
    var message = this.data.message
    message.message = e.detail.value
    this.setData({
      message: message
    })
  },

  cancel: function () {
    var message = {
      date: '',
      groupId: getApp().globalData.currentGroup.groupId,
      superiorId: getApp().globalData.myInfo.openId,
      staffId: '',
      message: '',
      ifRead: 0
    }
    this.setData({
      hideMessage: true,
      message: message
    })
  },

  confirm: function () {
    var that = this
    this.setData({
      hideMessage: true
    })
    var data = that.data.message
    data.date = util.sGetDate()
    staff.leaveMessage(data, function (res) {
      if (res.status == 1) {
        util.showModel("提示","留言成功!")
      } else if (res.status == -1) {
        util.showModel("提示", "留言失败，请重试!")
      } else {
        util.showModel("提示", "请求出错!")
      }
      var message = {
        date: '',
        groupId: getApp().globalData.currentGroup.groupId,
        superiorId: getApp().globalData.myInfo.openId,
        staffId: '',
        message: '',
        ifRead: 0
      }
      that.setData({
        message: message
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var message = {
      date: '',
      groupId: getApp().globalData.currentGroup.groupId,
      superiorId: getApp().globalData.myInfo.openId,
      staffId: '',
      message: '',
      ifRead: 0
    }
    this.setData({
      message: message
    })
    wx.showLoading({
      title: '读取中',
    })
    this.refresh()  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})