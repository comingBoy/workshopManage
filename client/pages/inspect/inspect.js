// pages/inspect/inspect.js
var workshop = require('../../utils/workshop.js')
var inspect = require('../../utils/inspect.js')
var workshopstatus = require('../../utils/workshopstatus.js')
var checkpoint = require('../../utils/checkpoint.js')
var util = require('../../utils/util.js')
var myInfo = null
var groupInfo = null
var getdate = function(){
  var myDate = new Date()
  var year = myDate.getFullYear()    //获取完整的年份(4位,1970-????)
  var month = myDate.getMonth() + 1       //获取当前月份(0-11,0代表1月)
  month = (month<10) ? '0'+ month : month
  return year.toString() + '-' + month.toString()
}
var getday = function(){
  var myDate = new Date()
  var year = myDate.getFullYear()    //获取完整的年份(4位,1970-????)
  var month = myDate.getMonth() + 1       //获取当前月份(0-11,0代表1月)
  var day = myDate.getDate()       //获取当前日(1-31)
  month = (month < 10) ? '0' + month : month
  day = (day < 10) ? '0' + day : day
  return year.toString() + '-' + month.toString() + '-' + day.toString()
}

var addWeekday = function(array){
  var weekdays = [
    "星期七","星期一", "星期二", "星期三", "星期四", "星期五", "星期六", 
  ]
  for(var i=0; i<array.length; i++){
    var date = new Date(array[i].date)
    array[i].weekday = weekdays[date.getDay()]
    array[i].date = array[i].date.slice(8, 10)
  }
}

var realDate = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    myWorkshop: null,
    inspectTimes: null,
    totalTimes: null,
    checkpoint: null,
    inspectHis: null,
    dangersList: [
      {
        finder: "李林峰",
        checkPoint: "检查点一号",  
      },
      {
        finder: "李林峰",
        checkPoint: "检查点二号",
      }
    ],
    ifDanger:[
      {
        value: "未发现",
        checked: true,
      },{
        value: "发现",
        checked: false,
      }
    ]
    ,
    indexNum: 0,
    checkpointNum: 0,
    indexNum1: 0,
    hiddenDetail: false,
    hiddenDangers: false,
    hiddenCheckTable: true,
    hiddenDangersDetail: true,
    progressQueue: null,
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
    myInfo = getApp().globalData.myInfo
    groupInfo = getApp().globalData.currentGroup
    realDate = getdate()
    var data = {
      openId: myInfo.openId,
      groupId: groupInfo.groupId
    }
    workshop.getMyWorkshop(data, function (res) {
      that.setData({
        myWorkshop: res,
        date: getdate(),
      })
      var data2 = {
        thisMonth: true,
        date: '^' + that.data.date,
        workshopId: that.data.myWorkshop[that.data.indexNum].workshopId
      }
      console.log(data2)
      inspect.getInspect(data2,function(res){
        console.log(res)
        var progressQueue = res.progressQueue
        addWeekday(progressQueue)
        console.log(progressQueue)
        that.setData({
          progressQueue,
          totalTimes: res.totalTimes,
          inspectTimes: res.inspectTimes,
        })
      })
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
  bindWorkshopChange: function (e) {
    this.setData({
      indexNum: e.detail.value
    })
    var that = this
    var data2 = {
      thisMonth: true,
      date: '^' + that.data.date,
      workshopId: that.data.myWorkshop[that.data.indexNum].id
    }
    console.log(data2)
    console.log(that.data.myWorkshop)
    inspect.getInspect(data2, function (res) {
      var progressQueue = res.progressQueue
      addWeekday(progressQueue)
      console.log(progressQueue)
      that.setData({
        progressQueue,
        totalTimes: res.totalTimes,
        inspectTimes: res.inspectTimes,
        hiddenDetail: false,
        hiddenDangers: false,
        hiddenCheckTable: true,
        hiddenDangersDetail: true,
      })
    })
  },


  bindDateChange: function (e) {
    console.log(e.detail.value)
    var that = this
    this.setData({
      date: e.detail.value
    })
    var data2 = {
      thisMonth: realDate == that.data.date ? true : false,
      date: '^' + that.data.date,
      workshopId: that.data.myWorkshop[that.data.indexNum].id
    }
    console.log(data2)
    inspect.getInspect(data2, function (res) {
      var progressQueue = res.progressQueue
      addWeekday(progressQueue)
      console.log(progressQueue)
      that.setData({
        progressQueue,
        totalTimes: res.totalTimes,
        inspectTimes: res.inspectTimes,
      })
    })
   
  },

  bindCheckPointChange: function (e) {
    this.setData({
      checkpointNum: e.detail.value
    })
  },


  bindDescriptionChange: function (e) {
    this.setData({
      indexNum1: e.detail.value
    })
  },


  inCheckPiont: function (e) {
    console.log(e.target.id)
    var that = this
    this.setData({
      hiddenDetail: false,
      hiddenDangers: !that.data.hiddenDangers,
      hiddenCheckTable: !that.data.hiddenCheckTable,
      hiddenDangersDetail: true,
      whichCheck: e.target.id,
    })
    var data = {
      workshopId: that.data.myWorkshop[that.data.indexNum].id,
      workshopStatusId: that.data.progressQueue[e.target.id].workshopStatusId
    }
    console.log(data)
    checkpoint.getCheckpoint(data, function (res) {
      if (res.status == 1) {
        console.log(res)
        that.setData({
          checkpoint: res.res
        })
        inspect.getInspectHis(data, function (res) {
          console.log(res)
          var checkpointBelong = new Array()
          for (var j = 0; j < that.data.checkpoint.length; j++){
            for (var i = 0; i < res.res.length; i++){
              if(res.res[i].checkpointId == that.data.checkpoint[j].id){
                checkpointBelong[j] = i
                break;
              }else{
                checkpointBelong[j] = -1
              }
            }
          }
          that.setData({
            inspectHis: res.res,
            checkpointBelong: checkpointBelong
          })
        })
      } else if (res.status == 0) {
        utils.showModel('提示', '尚无检查点！')
      } else {
        utils.showModel('提示', '请求出错！')
      }
    })
  },

  textInput: function (e) {
    console.log(e.detail.value)
  },

  newProgress: function(){
    var that = this
    if (that.data.date == getdate()) {
      var data = {
        workshopId: that.data.myWorkshop[that.data.indexNum].id
      }
      inspect.newProgress(data, function (res) {
        if (res.allInspected == 1){
          var data = {
            date: getday(),
            workshopId: that.data.myWorkshop[that.data.indexNum].id,
            groupId: getApp().globalData.currentGroup.id
          }
          console.log(data)
          workshopstatus.newWorkshopStatus(data,function(res){

          })
        }
      })
    }else{
      util.showModel("提示","不是当前月份!")
    }
  }
})