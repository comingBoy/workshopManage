// pages/checkWorkshop/checkWorkshop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workshopInfo: null,
    checkRecord:[{
      date: "2018-01-21"
    }],
    dangerListByAdmin:[
      {
        date: "2018-01-21",
        checkpointName: "检查点一号",
        inspectId: 3,
        error: 2,
      }
    ],
    dangerListByMyself:[
      {
        date: "2018-01-20",
        checkpointName: "检查点二号",
        inspectId:4,
        error: 1,
      }
    ],
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