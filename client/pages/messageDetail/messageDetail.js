// pages/messageDetail/messageDetail.js
var staff = require('../../utils/staff.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMessage: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      showMessage: getApp().globalData.showMessage
    })
    var data = {
      groupId: getApp().globalData.currentGroup.groupId,
      superiorId: getApp().globalData.showMessage.superiorInfo.openId,
      staffId: getApp().globalData.myInfo.openId
    }
    staff.readMessage(data, function (res) {
      console.log(res)
      if (res.status == 1) {
      } else if (res.status == -1) {
        util.showModel("提示","标记已读失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
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