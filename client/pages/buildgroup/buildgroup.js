// pages/buildgroup/buildgroup.js
var net = require('../../utils/net.js')
var group = require('../../utils/group.js')
var util = require('../../utils/util.js')
var groupMes = null
var password = null
const key = "123456"

Page({

  /**
  * 页面的初始数据
  */
  data: {
    finishFlag: false,
    cover: "../../images/camera.png",
  },
  chooseCover: function(){
    var that = this
    net.uploadImg(function(res){
      console.log("选择部门封面")
      console.log(res)
      groupMes.groupCover = res
      that.setData({
        cover: res
      })
      if (groupMes.groupName != null && groupMes.groupCode != null && groupMes.groupCover != null && groupMes.groupName != "" && groupMes.groupCode != "" && groupMes.groupCode.length == 6 && password != null && password.length == 6) {
        that.setData({ 
          finishFlag: true 
        })
      }else { 
        that.setData({ 
          finishFlag: false 
        }) 
      }
    })
  },
  
  getGroupName: function (e) {
    var that = this
    groupMes.groupName = e.detail.value;
    if (groupMes.groupName != null && groupMes.groupCode != null && groupMes.groupCover != null && groupMes.groupName != "" && groupMes.groupCode != "" && groupMes.groupCode.length == 6 && password != null && password.length == 6) {
      that.setData({
        finishFlag: true
      })
    } else {
      that.setData({
        finishFlag: false
      })
    }
    console.log(groupMes.groupName);
  },

  getGroupCode: function (e) {
    var that = this
    groupMes.groupCode = e.detail.value;
    if (groupMes.groupName != null && groupMes.groupCode != null && groupMes.groupCover != null && groupMes.groupName != "" && groupMes.groupCode != "" && groupMes.groupCode.length == 6 && password != null && password.length == 6) {
      that.setData({
        finishFlag: true
      })
    } else {
      that.setData({
        finishFlag: false
      })
    }
  },

  getPassword: function(e){
    var that = this
    password = e.detail.value;
    if (groupMes.groupName != null && groupMes.groupCode != null && groupMes.groupCover != null && groupMes.groupName != "" && groupMes.groupCode != "" && groupMes.groupCode.length == 6 && password != null && password.length == 6) {
      that.setData({
        finishFlag: true
      })
    } else {
      that.setData({
        finishFlag: false
      })
    }
  },
  finishBuild: function(){
    if (password == key){
      group.newGroup(groupMes)
    } else{
      util.showModel("创建失败","密码错误")
    }
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    groupMes = {
      groupName: null,
      groupCode: null,
      groupCover: null,
      adminId: getApp().globalData.myInfo.openId
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
  }
})