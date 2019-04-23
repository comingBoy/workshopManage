// pages/inspect/inspect.js
function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month
  var date0 = '^' + year.toString() + '-' + month.toString()
  return date0;
}
var workshop = require('../../utils/workshop.js')
var utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: mGetDate(),
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
    var date = that.data.date
    var data = {
      date: date,
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
  
  /**
   * 跳转到相应的车间检查界面
   */
  toCheckWorkshop: function(e){
    getApp().globalData.workshopInfo = this.data.myWorkshop[e.currentTarget.id]
    wx.navigateTo({
      url: '../checkpointList/checkpointList'
    })
  }
})