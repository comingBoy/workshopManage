// pages/register/register.js
var app = getApp()
var staff = require('../../utils/staff.js')
var net = require('../../utils/net.js')
var info = {
  name : null,
  staffId : null,
  sex: null,
  telNumber: null,
  avatar: null,
  openId: null
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    sex: ["男","女"],
    finishFlag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: app.globalData.userInfo.nickName,
      avatar: app.globalData.userInfo.avatarUrl
    })
    info.avatar = app.globalData.userInfo.avatarUrl
    info.openId = app.globalData.userInfo.openId
    info.name = app.globalData.userInfo.nickName
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
  changeAvatar: function (e) {
    var that = this
    net.uploadImgByAlbum(function (res) {
      info.avatar = res
      that.setData({
        avatar: res
      })
    })
  },
  input: function(e){
    if(e.currentTarget.id == 0){
      info.name = e.detail.value
    } else if (e.currentTarget.id ==1){
      info.telNumber = e.detail.value
    } else if (e.currentTarget.id == 2) {
      info.staffId = e.detail.value
    } else if (e.currentTarget.id == 3) {
      info.sex = e.detail.value
    } 
    if (info.name != "" && info.telNumber != "" && info.telNumber !=null && info.staffId != "" && info.staffId != null && info.telNumber.length == 11 && info.staffId.length == 8 && info.sex != null){
      this.setData({
        finishFlag: true
      })
    }else{
      this.setData({
        finishFlag: false
      })
    }
  },
  submit: function (e) {
    var urls = {
      functions: '../index0/index0'
    }
    staff.register(info, urls, function (res) {
      console.log(res)
      if(res.result.status == 1){
        app.globalData.myInfo = info
      }
    })
  },
})