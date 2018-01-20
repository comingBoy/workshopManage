// pages/inspect/inspect.js
var workshop = require('../../utils/workshop.js')
var utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myWorkshop: null
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
    var groupId = getApp().globalData.currentGroup.groupId
    var openId = getApp().globalData.myInfo.openId
    var data = {
      groupId : groupId,
      openId : openId
    }
    workshop.getMyWorkshop(data, function(res){
      that.setData({
        myWorkshop: res
      })
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
  
  },
})