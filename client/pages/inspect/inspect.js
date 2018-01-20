// pages/inspect/inspect.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myWorkshop: [{ 
      workshopName: "ins",
      inspectTimes: 0,
      error: 0,
      totalCheckpoints: 4,
      totalTimes: 3,
    }]
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
    var that = this
    myInfo = getApp().globalData.myInfo
    groupInfo = getApp().globalData.currentGroup
    realDate = getdate()
    var data = {
      openId: myInfo.openId,
      groupId: groupInfo.groupId
    }
    workshop.getMyWorkshop(data, function (res) {
      that.setData({
        myWorkshop: res,
        date: getdate(),
      })
      var data2 = {
        thisMonth: true,
        date: '^' + that.data.date,
        workshopId: that.data.myWorkshop[that.data.indexNum].workshopId
      }
      console.log(data2)
      inspect.getInspect(data2,function(res){
        console.log(res)
        var progressQueue = res.progressQueue
        addWeekday(progressQueue)
        console.log(progressQueue)
        that.setData({
          progressQueue,
          totalTimes: res.totalTimes,
          inspectTimes: res.inspectTimes,
        })
      })
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
   * 跳转到相应的车间检查界面
   */
  toCheckWorkshop: function(){
    wx.navigateTo({
      url: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})