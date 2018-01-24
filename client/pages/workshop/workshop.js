// pages/workshop/workshop.js
var util = require('../../utils/util.js')
var workshop = require('../../utils/workshop.js')
var checkWorkshop = require('../../utils/checkWorkshop.js')
function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month
  var date0 =year.toString() + '-' + month.toString()
  return date0;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifFindDanger: true,
    errorList: ["无故障", "存在故障", "故障已修复"],
    index: 0,
    hiddenFlag: true,
    workshopInfo:null,
    dangerInfo: null,
    checkpointList: [{
      checkpointId: 17,
      name: "检查点0"
    },
    {
      checkpointId: 16,
      name: "检查点2"
    }
    ],
    checkpointIndex: 0,
    checkRecord:[],
    dangerListByMyself:[],
    dangerListByAdmin:[],
    date: mGetDate(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      workshopInfo: getApp().globalData.showWorkshop
    })

    var that = this
    var workshopId = getApp().globalData.showWorkshop.workshopId
    var date = '^' + that.data.date
    var data = {
      workshopId: workshopId,
      date: date
    }
    workshop.getTimes(data, function (res) {
      if (res.status == -1) {
        utils.showModel('提示', '检查记录获取失败！')
      } else {
        that.setData({
          checkRecord: res.times
        })
      }
    })
    checkWorkshop.getError(data, function (res) {
      if (res.status == -1) {
        utils.showModel('提示', '隐患记录获取失败！')
      } else {
        that.setData({
          dangerListByAdmin: res.adminError,
          dangerListByMyself: res.staffError
        })
      }
    })
    //增加获取检查点checkpointList信息
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
  toCheckRecord: function(e){
    console.log(getApp().globalData)
    console.log(e)
    getApp().globalData.currentCheckRecord = this.data.checkRecord[e.currentTarget.id]
    wx.navigateTo({
      url: '../checkRecord/checkRecord',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 发现隐患
   */
  findDanger: function(){
    this.setData({
      ifFindDanger: !this.data.ifFindDanger,
      //初始化隐患信息
      dangerInfo: {
        timesId: -1,
        date: util.getDate(),
        workshopId: this.data.workshopInfo.workshopId,
        checkpointId: this.data.checkpointList[this.data.checkpointIndex].checkpointId,
        checkpointName: this.data.checkpointList[this.data.checkpointIndex].name,
        error: 1,
        admin: 1,
        description: "",
        photo: "../../images/camera.png",
        openId: this.data.workshopInfo.openId
      }
    })
  },
  /**
  * 选择发现隐患的检查点
  */
  chooseCheckpoint: function (e) {
    var dangerInfo = this.data.dangerInfo
    dangerInfo.checkpointId = this.data.checkpointList[e.detail.value].checkpointId,
      dangerInfo.checkpointName = this.data.checkpointList[e.detail.value].name,
    this.setData({
      checkpointIndex: e.detail.value,
      dangerInfo: dangerInfo
    })
  },
  /**
  * 上传隐患照片
  */
  choosePhoto: function () {
    var that = this
    var dangerInfo = this.data.dangerInfo
    net.uploadImg(function (res) {
      dangerInfo.photo = res
      that.setData({
        dangerInfo: dangerInfo
      })
    })
  },
  /**
   * 获取故障描述
   */
  textInput: function (e) {
    var dangerInfo = this.data.dangerInfo
    dangerInfo.description = e.detail.value
    this.setData({
      dangerInfo: dangerInfo
    })
  },

  /**
   * 上传发现隐患信息
   */
  dangerSubmit: function(){
    var that = this
    var dangerInfo = this.data.dangerInfo
    console.log(dangerInfo)
    if (dangerInfo.photo != "../../images/camera.png" && dangerInfo.description != ""){
      //上传API(dangerInfo)
      this.setData({
        ifFindDanger: !this.data.ifFindDanger
      })
      checkWorkshop.getError(data, function (res) {
        if (res.status == -1) {
          utils.showModel('提示', '隐患记录获取失败！')
        } else {
          that.setData({
            dangerListByAdmin: res.adminError,
            dangerListByMyself: res.staffError
          })
        }
      })
    }else{
      util.showModel("提示","请完善故障信息")
    }
  }
})