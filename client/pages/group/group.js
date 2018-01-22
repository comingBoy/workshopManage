var workshop = require('../../utils/workshop.js')

var getCurrentDate = function(){
  var date = new Date
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  month = (month < 10 ? "0" + month : month)
  var mydate = ('^' + year.toString() +'-' + month.toString())
  return mydate
}
// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workshopList: null,
    groupInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = {
      date: getCurrentDate(),
      groupId: getApp().globalData.currentGroup.groupId      
    }
    workshop.getGroupWorkshop(data,function(res){
      console.log(res)
      that.setData({
        workshopList: res
      })
    })
    that.setData({
      groupInfo: getApp().globalData.currentGroup
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
    console.log(123)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(123)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(123)
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
  toNewWorkshop: function(){
    wx.navigateTo({
      url: '../newWorkshop/newWorkshop',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toWorkshop: function(e){
    getApp().globalData.showWorkshop = this.data.workshopList[e.currentTarget.id]
    wx.navigateTo({
      url: '../workshop/workshop',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })      
  },
  back: function() {
    wx.reLaunch({
      url: '../index0/index0',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})