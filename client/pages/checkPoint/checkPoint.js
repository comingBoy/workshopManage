// pages/checkPoint/checkPoint.js

var checkpoint = require('../../utils/checkpoint.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workshopInfo: null,
    date: util.mGetDate(),
    checkpointList: [],
    statusList: ["正常","故障"]
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    this.fresh()
  },

  toCheckpoint: function (e) {
    getApp().globalData.showCheckpoint = this.data.checkpointList[e.currentTarget.id]
    wx.navigateTo({
      url: '../checkDetail/checkDetail'
    })
  },

  fresh: function () {
    var that = this
    that.setData({
      workshopInfo: getApp().globalData.showWorkshop
    })
    var workshopId = getApp().globalData.showWorkshop.workshopId
    var date = '^' + that.data.date
    var data = {
      workshopId: workshopId,
      date: date
    }
    checkpoint.getCheckpoint0(data, function (res) {
      if (res.status == 1) {
        that.setData({
          checkpointList: res.res
        })
      } else if (res.status == 0) {
        util.showModel("提示", "尚无检查点！")
      } else if (res.status == -1) {
        util.showModel("提示", "请求失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
  },

  toNewCheckpoint: function () {
    wx.navigateTo({
      url: '../newCheckpoint/newCheckpoint',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fresh()
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
    this.fresh()
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