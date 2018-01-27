// pages/modifyGroup/modifyGroup.js
var group = require('../../utils/group.js')
var util = require('../../utils/util.js')
var net = require('../../utils/net.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupName: '',
    groupCover: '',
    groupCode: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupName: getApp().globalData.currentGroup.groupName,
      groupCover: getApp().globalData.currentGroup.groupCover,
      groupCode: getApp().globalData.currentGroup.groupCode,
    })
  },

  delGroup: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          var data = {
            groupId: getApp().globalData.currentGroup.groupId
          }
          group.delGroup(data, function (res) {
            if (res.status == 1) {
              getApp().globalData.currentGroup
              wx.showModal({
                title: '提示',
                content: '删除成功！',
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../index0/index0',
                    })
                  }
                }
              })
            } else if (res.status == -1) {
              util.showModel("提示", "删除失败，请重试！")
            } else {
              util.showModel("提示", "请求出错！")
            }
          })
        }
      }
    })
  },

  chooseCover: function () {
    var that = this
    net.uploadImg(function (res) {
      that.setData({
        groupCover: res
      })
    })
  },

  getGroupName: function (e) {
    this.setData({
      groupName: e.detail.value
    })
  },

  getGroupCode: function (e) {
    this.setData({
      groupCode: e.detail.value
    })
  },

  finishBuild: function () {
    var that = this
    var currentGroup = getApp().globalData.currentGroup
    var data = {
      groupId: currentGroup.groupId,
      groupName: currentGroup.groupName,
      groupCover: that.data.groupCover,
      groupCode: currentGroup.groupCode
    }
    if (that.data.groupName != '' && that.data.groupName != null) {
      data.groupName = that.data.groupName
    }
    if (that.data.groupCode != '' && that.data.groupCode != null && that.data.groupCode.length == 6) {
      data.groupCode = that.data.groupCode
    } else if (that.data.groupCode != '' && that.data.groupCode != null && that.data.groupCode.length != 6) {
      util.showModel("提示","部门码为6位！")
    } else {
      data.groupCode = currentGroup.groupCode
    }
    group.modifyGroup(data, function(res) {
      if (res.status == 1) {
        getApp().globalData.currentGroup.groupName = data.groupName
        getApp().globalData.currentGroup.groupCover = data.groupCover
        getApp().globalData.currentGroup.groupCode = data.groupCode
        wx.showModal({
          title: '提示',
          content: '修改成功！',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      } else if (res.status == -1) {
        util.showModel("提示","修改失败，请重试！")
      } else {
        util.showModel("提示","请求出错！")
      }
    })
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