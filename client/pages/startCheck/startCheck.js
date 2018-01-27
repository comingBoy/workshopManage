// pages/startCheck/startCheck.js
var util = require('../../utils/util.js')
var net =require('../../utils/net.js')
var checkpoint = require('../../utils/checkpoint.js')
var inspect = require('../../utils/inspect.js')
var checkpointData = new Object
var checkpointIndex = null
var checkData = null
checkpointData.error = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    errorIndex: 0,
    errorList:[
      "无隐患",
      "发现隐患",
    ],
    ifSubmit: true,
    workshopInfo:null,
    checkpointInfo: null,
    checkInfo:null,
    checkData:null,
    initText:"请输入文本",
    initTextValue:"",
    Photo:"../../images/camera.png",
    ifCompleteFill: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      workshopInfo: getApp().globalData.workshopInfo
    })
    var workshopId = getApp().globalData.workshopInfo.workshopId
    var data = {
      workshopId: workshopId
    }
    checkpoint.getCheckpoint(data, function(res) {
      that.setData({
        checkpointInfo: res.res
      })
    })

    //获取缓存的检查数据
    wx.getStorage({
      key: getApp().globalData.workshopInfo.workshopId.toString(),
      success: function(res) {
        if (res.data == null) {
          checkData = new Array(getApp().globalData.workshopInfo.totalCheckpoints)
          for (var i = 0; i < checkData.length; i++) {
            checkData[i] = {
              data: null,
              status: "未完成检查"
            }
          }
          that.setData({
            checkData: checkData,
            ifCompleteFill: false
          })
        } else {
          checkData = res.data
          that.setData({
            checkData: checkData
          })
          var ifCompleteFill = null
          for (var i = 0; i < res.length; i++) {
            if (res[i].status == "未完成检查") {
              ifCompleteFill = false
              break;
            } else ifCompleteFill = true
          }
          that.setData({
            ifCompleteFill: ifCompleteFill
          })
        }
      },
      fail: function(){
        checkData = new Array(getApp().globalData.workshopInfo.totalCheckpoints)
        for(var i=0; i<checkData.length; i++){
          checkData[i] = {
            data: null,
            status: "未完成检查"
          }
        }
        that.setData({
          checkData: checkData,
          ifCompleteFill: false
        })
      },
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
    wx.setStorage({
      key: getApp().globalData.workshopInfo.workshopId.toString(),
      data: checkData,
      success: function(){
        console.log("存储数据成功")
      },
      fail: function(){
        console.log("存储数据失败")
      }
    })
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
   *弹出检查界面 
   */
  toCheck: function(e) {
    checkpointIndex = e.currentTarget.id
    var that = this
    this.setData({
      checkInfo: this.data.checkpointInfo[e.currentTarget.id],
      errorIndex: 0,
      initTextValue: "",
      photo:"../../images/camera.png",
    })
    if (this.data.checkData[checkpointIndex].status == "已完成检查"){
      util.showModel("提示","该检查点已经完成检查")
      that.setData({
        ifSubmit: true
      })
    }else{
      checkpointData = {
        date: util.getDate(),
        workshopId: getApp().globalData.workshopInfo.workshopId,
        openId: getApp().globalData.userInfo.openId,
        admin: 0,
        checkpointId: that.data.checkInfo.checkpointId,
        checkpointName: that.data.checkInfo.name,
        error: 0,
        photo: "",
        description: "",
      }
      that.setData({
        ifSubmit: false
      })
    }
  },
  /**
   * error选择器函数
   */
  bindErrorChange: function(e) {
    this.setData({
      errorIndex: e.detail.value
    })
    checkpointData.error = e.detail.value
  },
  /**
   * 上传隐患照片
   */
  choosePhoto: function() {
    var that = this
    net.uploadImg(function(res){
      checkpointData.photo = res
      that.setData({
        photo: res
      })
    })
  },
  /**
   * 获取故障描述
   */
  textInput: function(e) {
    checkpointData.description = e.detail.value
  },
  /**
   * 提交检查点信息
   */
  oneCheckpointSubmit: function(){
    var that = this
    if(checkpointData.error == 0){
      checkData[checkpointIndex].data = checkpointData
      checkData[checkpointIndex].status = "已完成检查"
      var ifCompleteFill = null
      for(var i=0; i<checkData.length; i++){
        if(checkData[i].status == "未完成检查"){
          ifCompleteFill = false
          break
        }else ifCompleteFill = true
      }
      that.setData({
        ifCompleteFill: ifCompleteFill,
        checkData: checkData,
        ifSubmit: true
      })
    }else{
      if(checkpointData.photo == ""){
        util.showModel("提示","请上传隐患照片")
      }
      if(checkpointData.description == ""){
        util.showModel("提示","请填写故障描述")
      }
      if(checkpointData.photo != "" && checkpointData.description != ""){
        checkData[checkpointIndex].data = checkpointData
        checkData[checkpointIndex].status = "已完成检查"
        var ifCompleteFill = null
        for (var i = 0; i < checkData.length; i++) {
          if (checkData[i].status == "未完成检查") {
            ifCompleteFill = false
            break
          } else ifCompleteFill = true
        }
        that.setData({
          ifCompleteFill: ifCompleteFill,
          checkData: checkData,
          ifSubmit: true
        })
      }
    }
  },
  /**
   *提交全部检查记录 
   */
  submit: function(){
    var inspectArray = []
    for (var i = 0; i < checkData.length; i++) {
      inspectArray.push(checkData[i].data)
    }
    var data = {
      inspectArray: inspectArray
    }
    inspect.inspect(data, function(res) {
      if(res.status == 1){
        checkData = null
        wx.showModal({
          title: '提示',
          content: '检查报告提交成功！',
          showCancel: false,
          success: function (res) {
            getApp().globalData.workshopInfo.inspectTimes ++
            wx.navigateBack({
              delta: 1,
            })
          }
        })   
      }else if(res.status == 0){
        util.showModel("提示","数据库错误，请联系管理员")
      }else{
        util.showModel("提示","上传失败，请检查网络")
      }
      
    })
  },
  /**
   * 无法提交情况下点击提交
   */
  noSubmit: function(){
    util.showModel("提示","请完成所有检查点的检查再提交")
  }
})