// pages/checkWorkshop/checkWorkshop.js
var net = require('../../utils/net.js')
function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month
  var date0 = year.toString() + '-' + month.toString()
  return date0;
}
var workshop = require('../../utils/workshop.js')
var util = require('../../utils/util.js')
var checkWorkshop = require('../../utils/checkWorkshop.js')
var inspect = require('../../utils/inspect.js')

var todayDate = util.getDate()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date0: util.getDate(),
    errorIndex: 0,
    errorList: ["无隐患","发现隐患"],
    checkpointInfo: '',
    date: mGetDate(),
    workshopInfo: null,
    checkRecord:null,
    dangerList: null,
    fixInfo:null,
    description: '',
    ifAdmin: ["自检隐患","管理员发现隐患"],
    canStartCheck: true,
    ifShowError: false,
    photo: "../../images/camera.png",
    initText: "请输入文本",
    initTextValue: "",
    ifCompleteFill: null,
    checkOver: false
  },

  refresh: function () {
    var that = this
    var date = '^' + that.data.date
    var data = {
      checkpointId: getApp().globalData.showCheckpoint.checkpointId,
      date: date
    }
    inspect.getInspectTimes(data, function (res) {
      if (res.status == 1) {
        if (res.res.length >= getApp().globalData.showCheckpoint.totalTimes) {
          that.setData({
            canStartCheck: false,
            checkOver: true
          })
        }
        that.setData({
          checkRecord: res.res
        })
      } else if (res.status == -1) {
        util.showModel("提示", "获取失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })

    inspect.getLastInspect(data, function (res) {
      if (res.status == 1) {
        if (res.res[0].error == 1) {
          that.setData({
            ifShowError: true,
            dangerList: res.res[0],
            canStartCheck: false
          })
        }
      } else if (res.status == 0) {
      } else if (res.status == -1) {
        util.showModel("提示", "获取失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      checkpointInfo: getApp().globalData.showCheckpoint
    })
    this.refresh()
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

  choosePhoto: function () {
    var that = this
    net.uploadImg(function (res) {
      that.setData({
        photo: res
      })
    })
  },

  textInput: function (e) {
    this.setData({
      description: e.detail.value
    })
  },

  bindErrorChange: function (e) {
    this.setData({
      errorIndex: e.detail.value
    })
  },

  inspectSubmit: function (e) {
    var that = this
    if (that.data.photo != "../../images/camera.png" && that.data.decription != "") {
      var data = {
        date: util.getDate(),
        workshopId: getApp().globalData.workshopInfo.workshopId,
        openId: getApp().globalData.userInfo.openId,
        admin: 0,
        checkpointId: that.data.checkpointInfo.checkpointId,
        checkpointName: that.data.checkpointInfo.checkpointName,
        error: that.data.errorIndex,
        description: that.data.description,
        photo: that.data.photo
      }
      inspect.inspect(data, function (res) {
        if (res.status == 1) {
          util.showModel("提示","提交成功")
          that.setData({
            errorIndex: 0,
            description: '',
            photo: "../../images/camera.png",
            initText: "请输入文本",
            initTextValue: "",
          })
          that.refresh()
        } else if (res.status == -1) {
          util.showModel("提示", "提交失败，请重试！")
        } else {
          util.showModel("提示", "请求出错！")
        }
      })
    } else {
      util.showModel("提示", "请完善报告")
    }
  },
  /**
   * 提交修复报告
   */
  fixInfoSubmit: function(e){
    var that = this
    if (that.data.photo != "../../images/camera.png" && that.data.decription != ""){
      var data = {
        inspectId: that.data.dangerList.inspectId,
        date: that.data.date,
        description: that.data.description,
        photo: that.data.photo
      }
      var urls = {
        checkWorkshop: './checkWorkshop'
      }
      inspect.fixError(data, function (res) {
        if (res.status == 1) {
          util.showModel("提示","上传成功！")
          that.setData({
            errorIndex: 0,
            description: '',
            photo: "../../images/camera.png",
            ifShowError: false,
            canStartCheck: true,
            initText: "请输入文本",
            initTextValue: "",
          })
          that.refresh()
        } else if (res.status == 0) {
          util.showModel('提示', '数据库异常！')
        }
        else if (res.status == -1) {
          util.showModel('提示', '上传失败，请重试！')
        } else {
          util.showModel('提示', '请求出错！')
        }
      })
    }else{
      util.showModel("提示","请完善报告")
    }
  }
})