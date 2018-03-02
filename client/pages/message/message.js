// pages/message/message.js
var staff = require('../../utils/staff.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readMessage: [],
    notReadMessage: []
  },

  toRead: function (e) {
    getApp().globalData.showMessage = this.data.readMessage[e.currentTarget.id]
    wx.navigateTo({
      url: '../messageDetail/messageDetail',
    })
  },

  toNotRead: function (e) {
    getApp().globalData.showMessage = this.data.notReadMessage[e.currentTarget.id]
    wx.navigateTo({
      url: '../messageDetail/messageDetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this
    var myMessage = getApp().globalData.myMessage
    var readMessage = []
    var notReadMessage = []
    var num = 0
    var data = {
      groupId: getApp().globalData.currentGroup.groupId,
      staffId: getApp().globalData.myInfo.openId
    }
    staff.getMyMessage(data, function (res) {
      if (res.status == 1) {
        for (var i = 0; i < res.myMessage.length; i++) {
          if (res.myMessage[i].ifRead == 0) {
            num = 0
            notReadMessage.push(res.myMessage[i])
            for (var j = 0; j < notReadMessage[notReadMessage.length - 1].message.length; j++) {
              if (notReadMessage[notReadMessage.length - 1].message[j].ifRead == 0) {
                num++
              }
            }
            notReadMessage[notReadMessage.length - 1].num = num
          } else {
            readMessage.push(res.myMessage[i])
          }
        }
        that.setData({
          readMessage: readMessage,
          notReadMessage: notReadMessage
        })
      } else if (res.status == 0) {
        util.showModel("提示", "暂无留言！")
      } else if (res.status == -1) {
        util.showModel("提示", "获取失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
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