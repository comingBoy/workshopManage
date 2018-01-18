// pages/application/application.js
var group = require("../../utils/group.js")
var ApplicationMes = null
var urls = null
var groupIndex = null
Page({

  /**
  * 页面的初始数据
  */
  data: {
    name: null,
    Tel: null,
    finishFlag: false,
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.setData({
      name: getApp().globalData.myInfo.name,
      Tel: getApp().globalData.myInfo.telNumber,
    })

    //初始化申请参数
    groupIndex = options.index
    ApplicationMes = {
      groupId: getApp().globalData.groupList[groupIndex].id,
      openId: getApp().globalData.myInfo.openId,
      groupCode: null,
    }
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
  getName: function (e) {
    
  },

  getTel: function (e) {
   
  },


  getGroupCode: function (e) {
    ApplicationMes.groupCode = e.detail.value;
    if (ApplicationMes.groupCode != null && ApplicationMes.groupCode != "" && ApplicationMes.groupCode.length == 6) {
      this.setData({ finishFlag: true })
    } else {
      this.setData({ finishFlag: false })
    }
    
  },


  finishApplication: function () {
     urls = {
       groupIndex: '../group/group?groupId=' + ApplicationMes.groupId
     }
     group.joinGroup(ApplicationMes,urls)
  },
})