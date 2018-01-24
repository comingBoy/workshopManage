// pages/checkRecord/checkRecprd.js
var inspect = require('../../utils/inspect.js')
var util = require('../../utils/util.js')
var checkWorkshop = require('../../utils/checkWorkshop.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifShow: true,
    errorList: ["无隐患", "隐患未修复", "隐患已修复"],
    workshopInfo: null,
    inspectInfo: null,
    inspectInfoByAdmin: null,
    fixInfo: null,
    fixInfoByAdmin: null,
    inspectListByMyself: [],
    inspectListByAdmin: [],
    checkRecord: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var timesId = getApp().globalData.currentCheckRecord.timesId
    var data = {
      timesId: timesId
    }
    inspect.getInspectHis(data, function (res) {
      console.log(res.res)
      var inspectListByMyself = []
      var inspectListByAdmin = []
      if (res.status == 1) {
        for (var i = 0; i < res.res.length; i++) {
          if (res.res[i].admin == 0) {
            inspectListByMyself.push(res.res[i])
          } else {
            inspectListByAdmin.push(res.res[i])
          }
        }
        that.setData({
          inspectListByMyself: inspectListByMyself,
          inspectListByAdmin: inspectListByAdmin
        })
      } else if (res.status == -1) {
        util.showModel('提示', '获取失败，请重试！')
      } else {
        util.showModel('提示', '请求出错！')
      }
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
   * 查看详情
   */
  toCheck: function (e) {
    console.log(e.currentTarget.id)
    var that = this
    var inspectInfo = this.data.inspectListByMyself[e.currentTarget.id]
    console.log(inspectInfo)
    var inspectId = inspectInfo.inspectId
    var data = {
      inspectId: inspectId
    }
    checkWorkshop.getFix(data, function(res) {
      console.log(res)
      var fix = res.fix[0]
      if (res.fix.length == 0) {
        fix = {
          photo: "",
          description: ""
        }
      }
      that.setData({
        fixInfo: fix,
        inspectInfo: res.error[0],
        ifShow: false
      })
    })
    

    /*
    var inspectInfoByAdmin = null
    for (var i = 0; i < this.data.inspectListByAdmin.length; i++) {
      if (this.data.inspectListByAdmin[i].checkpointId == inspectInfo.checkpointId) {
        inspectInfoByAdmin = this.data.inspectListByAdmin[i]
        break;
      }
      else inspectInfoByAdmin = ""
    }
    this.setData({
      inspectInfoByAdmin: inspectInfoByAdmin,
      inspectInfo: inspectInfo,
      ifShow: false
    })*/
  }
})