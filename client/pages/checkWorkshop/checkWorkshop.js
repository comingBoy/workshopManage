// pages/checkWorkshop/checkWorkshop.js
var net = require('../../utils/net.js')
function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month
  var date0 = '^' + year.toString() + '-' + month.toString()
  return date0;
}
var workshop = require('../../utils/workshop.js')
var utils = require('../../utils/util.js')
var checkWorkshop = require('../../utils/checkWorkshop.js')
var inspect = require('../../utils/inspect.js')

var todayDate = utils.getDate()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: mGetDate(),
    workshopInfo: null,
    checkRecord:null,
    dangerListByAdmin: null,
    dangerListByMyself: null,
    errorInfo: null,
    fixInfo:null,
    errorList:["无故障","存在故障","故障已修复"],
    canStartCheck: true,
    ifShowError: true,
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
    //初始化是否能开始检查
    var canStartCheck = null
    if (getApp().globalData.workshopInfo.inspectTimes >= getApp().globalData.workshopInfo.totalTimes) canStartCheck = false
    else canStartCheck = true
    var that = this
    var workshopId = getApp().globalData.workshopInfo.workshopId
    var date = that.data.date
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
        console.log(todayDate)
        for(var i=0; i<res.times.length; i++){
          if(res.times[i].date == todayDate){
            canStartCheck = false
            break
          }
        }
      }
    })
    checkWorkshop.getError(data, function (res) {
      if (res.status == -1) {
        utils.showModel('提示', '隐患记录获取失败！')
      } else {
        if(canStartCheck == true){
          for(var i=0; i<res.staffError.length; i++){
            if(res.staffError[i].error == 1){
              canStartCheck = false
              break
            }
          }
          if(canStartCheck == true){
            for(var i=0; i<res.adminError.length; i++){
              if(res.adminError[i].error == 1){
                canStartCheck = false
                break
              }
            }
          }
        }
        that.setData({
          dangerListByAdmin: res.adminError,
          dangerListByMyself: res.staffError,
          canStartCheck: canStartCheck,
          workshopInfo: getApp().globalData.workshopInfo,
        })
    
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
  /**
   * 开始检查
   */
  startCheck: function() {
    wx.navigateTo({
      url: '../startCheck/startCheck',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 不能开始检查提示
   */
  canNotStartCheck: function() {
    console.log(this.data.dangerListByAdmin.length)
    utils.showModel("提示","已完成检查任务或存在故障未解决")
  },
  /**
   * 显示修复故障
   */
  showErrorByMyself: function(e){
    var that = this
    if (that.data.dangerListByMyself[e.currentTarget.id].error == 1) {
      var inspectId = that.data.dangerListByMyself[e.currentTarget.id].inspectId
      var data = {
        inspectId: inspectId
      }
      inspect.getInspectById(data, function (res) {
        if (res.status == 1) {
          that.setData({
            ifShowError: !that.data.ifShowError,
            errorInfo: {
              date: res.res[0].date,
              checkpointName: res.res[0].checkpointName,
              error: res.res[0].error,
              description: res.res[0].description,
              photo: res.res[0].photo,
            },
            fixInfo: {
              inspectId: inspectId,
              date: utils.getDate(),
              description: "",
              photo: "../../images/camera.png",
            }
          })
        } else if (res.status == 0) {
          utils.showModel("提示", "数据库异常！")
        } else {
          utils.showModel("提示", "请求错误！")
        }
      })
    }
  },
  showErrorByAdmin: function(e){
    var that = this
    if (that.data.dangerListByAdmin[e.currentTarget.id].error == 1){
      var inspectId = that.data.dangerListByAdmin[e.currentTarget.id].inspectId
      var data = {
        inspectId: inspectId
      }
      inspect.getInspectById(data, function(res) {
        console.log(res)
        if (res.status == 1) {
          that.setData({
            ifShowError: !that.data.ifShowError,
            errorInfo: {
              date: res.res[0].date,
              checkpointName: res.res[0].checkpointName,
              error: res.res[0].error,
              description: res.res[0].description,
              photo: res.res[0].photo,
            },
            fixInfo: {
              inspectId: inspectId,
              date: utils.getDate(),
              description: "",
              photo: "../../images/camera.png",
            }
          })
        } else if (res.status == 0) {
          utils.showModel("提示", "数据库异常！")
        } else {
          utils.showModel("提示","请求错误！")
        }
      })    
    }
  },
  /**
   * 上传修复照片
   */
  choosePhoto: function () {
    var that = this
    net.uploadImg(function (res) {
      that.data.fixInfo.photo = res
      that.setData({
        fixInfo: that.data.fixInfo
      })
    })
  },
  /**
  * 获取修复描述
  */
  textInput: function (e) {
    var fixInfo = this.data.fixInfo
    fixInfo.description = e.detail.value
    this.setData({
      fixInfo: fixInfo
    })
  },
  /**
   * 提交修复报告
   */
  fixInfoSubmit: function(e){
    var fixInfo = this.data.fixInfo
    if (fixInfo.photo != "../../images/camera.png" && fixInfo.decription != ""){
      //API(fixInfo)提交
      var data = {
        inspectId: fixInfo.inspectId,
        date: fixInfo.date,
        description: fixInfo.description,
        photo: fixInfo.photo
      }
      var urls = {
        checkWorkshop: './checkWorkshop'
      }
      inspect.fixError(data, urls)
      console.log(fixInfo)
    }else{
      utils.showModel("提示","请完善报告")
    }
  }
})