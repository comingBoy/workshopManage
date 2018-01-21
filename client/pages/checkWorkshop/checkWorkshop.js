// pages/checkWorkshop/checkWorkshop.js
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
    errorList:["无","存在故障","故障已修复"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.workshopInfo)
    this.setData({
      workshopInfo: getApp().globalData.workshopInfo
    })
    var that = this
    var workshopId = getApp().globalData.workshopInfo.workshopId
    var date = that.data.date
    var data = {
      workshopId: workshopId,
      date: date
    }
    workshop.getTimes(data, function(res) {
      if (res.status == -1) {
        utils.showModel('提示','检查记录获取失败！')
      } else {
        that.setData({
          checkRecord: res.times
        })
      }
    })
    checkWorkshop.getError(data, function(res) {
      if (res.status == -1) {
        utils.showModel('提示', '隐患记录获取失败！')
      } else {
        that.setData({
          dangerListByAdmin: res.adminError,
          dangerListByMyself: res.staffError
        })
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