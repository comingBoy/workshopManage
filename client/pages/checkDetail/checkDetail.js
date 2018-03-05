// pages/checkDetail/checkDetail.js
var util = require('../../utils/util.js')
var checkpoint = require('../../utils/checkpoint.js')
var net = require('../../utils/net.js')
var inspect = require('../../utils/inspect.js')
var checkWorkshop = require('../../utils/checkWorkshop.js')
var group = require('../../utils/group.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkpointInfo: null,
    workshopInfo: null,
    dangerInfo: null,
    date: util.mGetDate(),
    checkRecord: [],
    adminError: [],
    staffError: [],
    ifFindDanger: true,
    errorList: ["无故障", "存在故障", "故障已修复"],
    ifShow: true,
    ifShow0: true,
    inspectInfo: null,
    fixInfo: null,
    ifShowFind: false,
    inspectId: ''
  },

  findDanger: function () {
    this.setData({
      ifFindDanger: !this.data.ifFindDanger,
      //初始化隐患信息
      dangerInfo: {
        timesId: -1,
        date: util.getDate(),
        workshopId: this.data.workshopInfo.workshopId,
        checkpointId: this.data.checkpointInfo.checkpointId,
        checkpointName: this.data.checkpointInfo.checkpointName,
        error: 1,
        admin: 1,
        description: "",
        photo: "../../images/camera.png",
        openId: this.data.workshopInfo.openId
      }
    })
  },

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

  textInput: function (e) {
    var dangerInfo = this.data.dangerInfo
    dangerInfo.description = e.detail.value
    this.setData({
      dangerInfo: dangerInfo
    })
  },

  dangerSubmit: function () {
    var that = this
    var dangerInfo = that.data.dangerInfo
    if (dangerInfo.photo != "../../images/camera.png" && dangerInfo.description != "") {
      var data = {
        inspectArray: dangerInfo
      }
      inspect.inspect0(data, function (res) {
        if (res.status == 1) {
          wx.showModal({
            title: '提示',
            content: '上传成功！',
            showCancel: false,
            success: function (res) {
              that.setData({
                ifFindDanger: !that.data.ifFindDanger
              })
              getApp().globalData.showCheckpoint.error = 1
              that.fresh()
            }
          })
        } else if (res.status == 0) {
          util.showModel("提示", "数据库错误，请联系管理员")
        } else {
          util.showModel("提示", "上传失败，请检查网络")
        }
      })
    } else {
      util.showModel("提示", "请完善故障信息")
    }
  },

  getStaffError: function (e) {  
    var inspectId = this.data.staffError[e.currentTarget.id].inspectId
    this.getFix(inspectId)
  },

  getFix: function (e) {
    var that = this
    var data = {
      inspectId: e
    }
    checkWorkshop.getFix(data, function (res) {
      var ifShow = that.data.ifShow
      if (res.status == 1) {
        if (res.error.length > 0) {
          var inspectInfo = res.error[0]
        } else {
          var inspectInfo = {
            photo: '',
            description: ''
          }
        }
        if (res.fix.length > 0) {
          var fixInfo = res.fix[0]
        } else {
          var fixInfo = {
            photo: '',
            description: ''
          }
        }
        if(e == that.data.inspectId) {
          that.setData({
            inspectInfo: inspectInfo,
            fixInfo: fixInfo,
            ifShow: !ifShow,
            ifShow0: true,
            inspectId: e
          })
        } else {
          that.setData({
            inspectInfo: inspectInfo,
            fixInfo: fixInfo,
            ifShow: false,
            ifShow0: true,
            inspectId: e
          })
        }
      } else if (res.status == -1) {
        util.showModel("提示", "获取报告失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
  },

  getAdminError: function (e) {
    var inspectId = this.data.adminError[e.currentTarget.id].inspectId
    this.getFix(inspectId)
  },

  fresh: function () {
    var that = this
    that.setData({
      checkpointInfo: getApp().globalData.showCheckpoint,
      workshopInfo: getApp().globalData.showWorkshop
    })
    var date = '^' + that.data.date
    var checkpointId = getApp().globalData.showCheckpoint.checkpointId
    var data = {
      date: date,
      checkpointId: checkpointId,
      groupId: getApp().globalData.currentGroup.groupId
    }
    group.getStaff(data, function (res) {
      if (res.status == 1) {
        var staffList = new Array()
        staffList.push.apply(staffList, res.adminList)
        staffList.push.apply(staffList, res.superiorList)
        var ifShowFind = false
        if (staffList.indexOf(getApp().globalData.myInfo.openId) != -1 &&that.data.checkpointInfo.error != 1) ifShowFind = true
        that.setData({
          ifShowFind: ifShowFind
        })
      } else if (res.status == -1) {
        util.showModel("提示", "请求失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })

    checkpoint.getCheckDetail(data, function (res) {
      if (res.status == 1) {
        var i, j, k
        var staffError = []
        var adminError = []
        var checkRecord = []
        for (i = 0; i < res.res.length; i++) {
          if (res.res[i].admin == 0) {
            checkRecord.push(res.res[i])
          }
          if (res.res[i].error != 0 && res.res[i].admin == 0) {
            staffError.push(res.res[i])
          } 
          if (res.res[i].error != 0 && res.res[i].admin == 1) {
            adminError.push(res.res[i])
          }
        }
        that.setData({
          checkRecord: checkRecord,
          staffError: staffError,
          adminError: adminError
        })
      } else if (res.status == 0) {
        util.showModel("提示", "尚无检查记录！")
      } else if (res.status == -1) {
        util.showModel("提示", "请求失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
  },

  toCheckRecord: function (e) {
    var that = this
    var inspectId = that.data.checkRecord[e.currentTarget.id].inspectId
    var data = {
      inspectId: inspectId
    }
    inspect.getInspectById(data, function (res) {
      if (res.status == 1) {
        that.setData({
          ifShow: true,
          ifShow0: false,
          inspectInfo: res.res[0],
        })
      } else if (res.status == -1) {
        util.showModel("提示", "获取报告失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fresh()
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