// pages/startCheck/startCheck.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifSubmit: true,
    workshopInfo:null,
    checkpointInfo: [
      {
        checkpointId:1,
        workshopId:3,
        name: "检查点一",
        status: "未完成检查",
      },
      {
        checkpointId:2,
        workshopId:3,
        name:"检查点二",
        status: "已完成检查"
      }
    ],
    checkInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      workshopInfo: getApp().globalData.workshopInfo
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

  /**
   *弹出检查界面 
   */
  toCheck: function(e) {
    console.log(e)
    var that = this
    this.setData({
      checkInfo: this.data.checkpointInfo[e.currentTarget.id]
    })
    console.log(this.data.checkInfo)
    if(this.data.checkInfo.status == "已完成检查"){
      util.showModel("提示","该检查点已经完成检查")
      that.setData({
        ifSubmit: true
      })
    }else{
      that.setData({
        ifSubmit: false
      })
    }
  }
})