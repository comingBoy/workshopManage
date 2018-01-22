// pages/workshop/workshop.js
var workshop = require('../../utils/workshop.js')
var checkWorkshop = require('../../utils/checkWorkshop.js')
function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month
  var date0 =year.toString() + '-' + month.toString()
  return date0;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    hiddenFlag: true,
    workshopInfo:null,
    checkRecord:[],
    dangerListByMyself:[],
    dangerListByAdmin:[],
    date: mGetDate(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      workshopInfo: getApp().globalData.showWorkshop
    })

    var that = this
    var workshopId = getApp().globalData.showWorkshop.workshopId
    var date = '^' + that.data.date
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
      }
    })
    checkWorkshop.getError(data, function (res) {
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
  
  },
  bindDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function(e){
    this.setData({
      index: e.detail.value
    })
  },
  addCheckTime: function(){
    this.setData({
      hiddenFlag : false
    })
  },
  confirmAdd: function(){
    this.setData({
      hiddenFlag: true
    })
  },
  toCheckPoint: function(e){
    getApp().globalData.checkDate = this.data.date + '-' + this.data.checkTime[e.currentTarget.id].date
    wx.navigateTo({
      url: '../checkPoint/checkPoint',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  delCheckTime: function(){
    console.log("删除了")
  }
})