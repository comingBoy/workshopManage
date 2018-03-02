var workshop = require('../../utils/workshop.js')
var util = require('../../utils/util.js')
var group = require('../../utils/group.js')

var getCurrentDate = function(){
  var date = new Date
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  month = (month < 10 ? "0" + month : month)
  var mydate = ('^' + year.toString() +'-' + month.toString())
  return mydate
}
// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workshopList: null,
    groupInfo: null,
    isAdmin: false,
    statusList: ["正常","存在故障"]
  },

  modifyWorkshop: function(e) {
    var workshopId = this.data.workshopList[e.currentTarget.id].workshopId
    getApp().globalData.staffOpenId = this.data.workshopList[e.currentTarget.id].openId
    wx.navigateTo({
      url: '../modifyWorkshop/modifyWorkshop?workshopId=' + workshopId,
    })
  },

  modifyGroup: function() {
    wx.navigateTo({
      url: '../modifyGroup/modifyGroup',
    })  
  },

  delGroup: function () {
    var that = this
    var data = {
      groupId: getApp().globalData.currentGroup.groupId
    }
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          group.delGroup(data, function (res) {
            if (res.status == 1) {
              wx.showModal({
                title: '提示',
                content: '删除成功！',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../index0index0',
                    })
                  }
                }
              })
            }
          })
        }
      }
    })   
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
    var data = {
      date: getCurrentDate(),
      groupId: getApp().globalData.currentGroup.groupId
    }
    group.getStaff(data, function (res) {
      if (res.status == 1) {
        if (res.adminList.indexOf(getApp().globalData.myInfo.openId) != -1) {
          that.setData({
            isAdmin: true
          })
        }
      } else if (res.status == -1) {
        util.showModel("提示", "获取失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
    workshop.getGroupWorkshop(data, function (res) {
      that.setData({
        workshopList: res
      })
    })
    that.setData({
      groupInfo: getApp().globalData.currentGroup
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
  toNewWorkshop: function(){
    wx.navigateTo({
      url: '../newWorkshop/newWorkshop',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toWorkshop: function(e){
    getApp().globalData.showWorkshop = this.data.workshopList[e.currentTarget.id]
    wx.navigateTo({
      url: '../checkPoint/checkPoint',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })      
  },
  back: function() {
    wx.reLaunch({
      url: '../index0/index0',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})