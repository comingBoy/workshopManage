var group = require('../../utils/group.js')

var urls = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList:null,
    myGroupList: ''
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
    group.getAllGroup(function (res) {
      that.setData({
        groupList: res
      })
      getApp().globalData.groupList = res
    })
    urls = {
      joinGroup: "../application/application",
      groupIndex: "../group/group"
    }
    var data = {
      openId: getApp().globalData.myInfo.openId
    }
    group.getMyGroup(data, function (res) {
      if (res.status == 1) {
        that.setData({
          myGroupList: res.myGroupList
        })
      } else if (res.status == -1) {
        util.showModel("提示","获取失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
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

  toGroup: function (e) {
    getApp().globalData.currentGroup = this.data.myGroupList[e.currentTarget.id]
    wx.reLaunch({
      url: '../group/group',
    })
  },

  enterApplication: function (e) {
    var that = this
    var data = {
      openId: getApp().globalData.myInfo.openId,
      groupId: that.data.groupList[e.currentTarget.id].groupId
    }
    urls.groupIndex = urls.groupIndex + '?index=' + e.currentTarget.id
    urls.joinGroup = urls.joinGroup + '?index=' + e.currentTarget.id
    getApp().globalData.currentGroup = getApp().globalData.groupList[e.currentTarget.id]
    group.verifyStaff(data,urls,function(res){
      
    })
  },
  enterBiuldGroup: function () {
    wx.navigateTo({
      url: '../buildgroup/buildgroup',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})