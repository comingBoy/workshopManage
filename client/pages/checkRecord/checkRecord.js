// pages/checkRecord/checkRecprd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifShow: true,
    errorList: ["无隐患","隐患未修复","隐患已修复"],
    workshopInfo: null,
    inspectInfo: null,
    inspectInfoByAdmin: null,
    inspectListByMyself: [
      {
        date: "2018-01-22",
        checkpointId: 16,
        checkpointName: "检查点0",
        error: 0,
        description: "",
        photo: "",
      },
      {
        date: "2018-01-22",
        checkpointId: 17,
        checkpointName: "检查点1",
        error: 0,
        description: "",
        photo: "",
      },
      {
        date: "2018-01-22",
        checkpointId: 18,
        checkpointName: "检查点2",
        error: 0,
        description: "",
        photo: "",
      },
      {
        date: "2018-01-22",
        checkpointId: 19,
        checkpointName: "检查点3",
        error: 0,
        description: "",
        photo: "",
      }
    ],
    inspectListByAdmin: [
      {
        date: "2018-01-22",
        checkpointName: "检查点0",
        checkpointId: 16,
        error: 0,
        description:"",
        photo: "",
      }
    ],
    checkRecord: null,
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
   * 查看详情
   */
  toCheck: function(e){
    console.log(e)
    var inspectInfo = this.data.inspectListByMyself[e.currentTarget.id]
    var inspectInfoByAdmin = null
    for(var i=0; i<this.data.inspectListByAdmin.length; i++){
      if(this.data.inspectListByAdmin[i].checkpointId == inspectInfo.checkpointId){
        inspectInfoByAdmin = this.data.inspectListByAdmin[i]
        break;
      }
      else inspectInfoByAdmin = ""
    }
    this.setData({
      inspectInfo: inspectInfo,
      ifShow: false
    })
  }
})