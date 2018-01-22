// pages/workshop/workshop.js
function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var d = new Date(year, month, 0);

  var time0 = []
  for (var i=0; i < d.getDate(); i++) {
    time0.push(i + 1)
  }
  return time0;
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
    date: '2017-12',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      workshopInfo: getApp().globalData.showWorkshop
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