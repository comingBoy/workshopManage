// pages/checkWorkshop/checkWorkshop.js
var util = require('../../utils/util.js')
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
var checkWorkshop = require('../../utils/checkWorkshop.js')

var todayDate = util.getDate()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: mGetDate(),
    workshopInfo: null,
    checkRecord:null,
    dangerListByAdmin: null,
    dangerListByMyself: null,
    errorList:["无","存在故障","故障已修复"],
    canStartCheck: true,
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
    //初始化是否能开始检查
    var canStartCheck = null
    if (getApp().globalData.workshopInfo.inspectTimes >= getApp().globalData.workshopInfo.totalTimes) canStartCheck = false
    else canStartCheck = true
    var that = this
    var workshopId = getApp().globalData.workshopInfo.workshopId
    var date = that.data.date
    var data = {
      workshopId: workshopId,
      date: date
    }
    workshop.getTimes(data, function (res) {
      if (res.status == -1) {
        utils.showModel('提示', '检查记录获取失败！')
      } else {
        that.setData({
          checkRecord: res.times
        })
        console.log(todayDate)
        for(var i=0; i<res.times.length; i++){
          if(res.times[i].date == todayDate){
            canStartCheck = false
            break
          }
        }
      }
    })
    checkWorkshop.getError(data, function (res) {
      if (res.status == -1) {
        utils.showModel('提示', '隐患记录获取失败！')
      } else {
        if(canStartCheck == true){
          for(var i=0; i<res.staffError.length; i++){
            if(res.staffError[i].error == 1){
              canStartCheck = false
              break
            }
          }
          if(canStartCheck == true){
            for(var i=0; i<res.adminError.length; i++){
              if(res.adminError[i].error == 1){
                canStartCheck = false
                break
              }
            }
          }
        }
        that.setData({
          dangerListByAdmin: res.adminError,
          dangerListByMyself: res.staffError,
          canStartCheck: canStartCheck,
          workshopInfo: getApp().globalData.workshopInfo,
        })
    
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
  
  },
  /**
   * 开始检查
   */
  startCheck: function() {
    wx.navigateTo({
      url: '../startCheck/startCheck',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 不能开始检查提示
   */
  canNotStartCheck: function() {
    util.showModel("提示","已完成检查任务或存在故障未解决")
  }
})