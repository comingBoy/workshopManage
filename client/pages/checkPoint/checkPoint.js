// pages/checkPoint/checkPoint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkDate: null,
    checkPoint: [
      {
        name: "检查点1",
        state: "未检查"
      },{
        name: "检查点2",
        state: "已检查(无故障)"
      },{
        name: "检查点3",
        state: "已检查(存在故障)"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      checkDate: getApp().globalData.checkDate
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
  toCheckDetail: function(){
    wx.navigateTo({
      url: '../checkDetail/checkDetail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})