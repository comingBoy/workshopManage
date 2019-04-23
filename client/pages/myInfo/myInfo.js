// pages/myMes/myMes.js
var util = require('../../utils/util.js')
var staff = require('../../utils/staff.js')
var net = require('../../utils/net.js')
var myInfo = null
var changeInfo = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    myInfo: null,
    changeWhat:["更改姓名","性别","更改工号","更改手机号",],
    sex:["男","女"],
    changeFlag:true,
    index: null,
    readMessage: [],
    notReadMessage: []
  },

  changeInfo:function(e){
    var that = this
    if (e.currentTarget.id == 0){
      if (e.currentTarget.id == that.data.index) {
        this.setData({
          index: e.currentTarget.id,
          changeFlag: !that.data.changeFlag,
          changeCtx: myInfo.name,
        })
      } else {
        this.setData({
          index: e.currentTarget.id,
          changeFlag: false,
          changeCtx: myInfo.name,
        })
      }
    } else if (e.currentTarget.id == 1){
      if (e.currentTarget.id == that.data.index) {
        this.setData({
          index: e.currentTarget.id,
          changeFlag: !that.data.changeFlag,
          changeCtx: myInfo.sex,
        })
      } else {
        this.setData({
          index: e.currentTarget.id,
          changeFlag: false,
          changeCtx: myInfo.sex,
        })
      }
    } else if (e.currentTarget.id == 2) {
      if (e.currentTarget.id == that.data.index) {
        this.setData({
          index: e.currentTarget.id,
          changeFlag: !that.data.changeFlag,
          changeCtx: myInfo.staffId,
        })
      } else {
        this.setData({
          index: e.currentTarget.id,
          changeFlag: false,
          changeCtx: myInfo.staffId,
        })
      }
    } else if (e.currentTarget.id == 3) {
      if (e.currentTarget.id == that.data.index) {
        this.setData({
          index: e.currentTarget.id,
          changeFlag: !that.data.changeFlag,
          changeCtx: myInfo.telNum,
        })
      } else {
        this.setData({
          index: e.currentTarget.id,
          changeFlag: false,
          changeCtx: myInfo.telNum,
        })
      }
    }
    
  },
  input: function(e){
    changeInfo = e.detail.value
  },
  changeSave: function(){
    var that = this
    var index = this.data.index
    if(index == 0){
      if(changeInfo == ""){
        util.showModel('提示', '姓名不能为空！')
      }else{
        myInfo.name = changeInfo
        staff.modifyUserInfo(myInfo,function(){
          getApp().globalData.myInfo = myInfo
          that.setData({
            myInfo: myInfo,
            changeFlag: true
          })
        })
      }
    } else if (index == 1){
      myInfo.sex = changeInfo 
      staff.modifyUserInfo(myInfo, function () {
        getApp().globalData.myInfo = myInfo
        that.setData({
          myInfo: myInfo,
          changeFlag: true
        })
      })
    } else if (index == 2){
      if (changeInfo.length != "8") {
        util.showModel('提示', '请输入8位工号！')
      } else {
        myInfo.staffId = changeInfo
        staff.modifyUserInfo(myInfo, function () {
          getApp().globalData.myInfo = myInfo
          that.setData({
            myInfo: myInfo,
            changeFlag: true
          })
        })
      }
    } else if (index == 3) {
      if (changeInfo.length != "11") {
        util.showModel('提示', '请输入11位手机号！')
      } else {
        myInfo.telNum = changeInfo
        staff.modifyUserInfo(myInfo, function () {
          getApp().globalData.myInfo = myInfo
          that.setData({
            myInfo: myInfo,
            changeFlag: true
          })
        })
      }
    }
  },
  changeAvatar:function(){
    var that = this
    net.uploadImg(function(res){
      myInfo.avatar = res
      staff.modifyUserInfo(myInfo, function () {
        getApp().globalData.myInfo = myInfo
        that.setData({
          myInfo: myInfo,
          changeFlag: true
        })
      })
    })
  },

  checkMessage: function () {
    wx.navigateTo({
      url: '../message/message',
    })
  },

  checkMessage0: function () {
    util.showModel("提示","暂无留言！")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      myInfo: getApp().globalData.myInfo
    })
    myInfo = getApp().globalData.myInfo
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
      staffId: getApp().globalData.myInfo.openId,
      groupId: getApp().globalData.currentGroup.groupId
    }
    staff.getMessage(data, function (res) {
      if (res.status == 1) {
        getApp().globalData.myMessage = {
          readMessage: res.readMessage,
          notReadMessage: res.notReadMessage
        }
        that.setData({
          readMessage: res.readMessage,
          notReadMessage: res.notReadMessage
        })
      } else if (res.status == -1) {
        util.showModel("提示","获取留言失败，请重试！")
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
  
  }
})