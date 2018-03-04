var workshop = require('../../utils/workshop.js')
var util = require('../../utils/util.js')
var group = require('../../utils/group.js')

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

  modifyWorkshop: function(e) {
    var workshopId = this.data.workshopList[e.currentTarget.id].workshopId
    getApp().globalData.staffOpenId = this.data.workshopList[e.currentTarget.id].openId
    wx.navigateTo({
      url: '../modifyWorkshop/modifyWorkshop?workshopId=' + workshopId,
    })
  },

  modifyGroup: function() {

    var that = this
    var openId = getApp().globalData.myInfo.openId
    if (openId == that.data.groupInfo.adminId) {
      wx.navigateTo({
        url: '../modifyGroup/modifyGroup',
      })
    } else {
      util.showModel("提示","没有管理员权限！")
    }
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
    wx:wx.showLoading({
      title: '加载中',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    var that = this
    var data = {
      date: getCurrentDate(),
      groupId: getApp().globalData.currentGroup.groupId
    }
    that.setData({
      groupInfo: getApp().globalData.currentGroup
    })
    workshop.getGroupWorkshop(data, function (res) {
      that.setData({
        workshopList: res
      })
      wx.hideLoading()
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
      url: '../checkPoint/checkPoint',
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