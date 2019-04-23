// pages/newCheckpoint/newCheckpoint.js
var util = require('../../utils/util.js')
var checkpoint = require('../../utils/checkpoint.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    workshopId: '',
    checkpointNum: '',
    checkpointName: '',
    times: '',
  },

  getCheckpointName: function (e) {
    this.setData({
      checkpointName: e.detail.value
    })
  },

  getTimes: function (e) {
    this.setData({
      times: e.detail.value
    })
  },

  newCheckpoint: function () {
    var data = {
      workshopId: this.data.workshopId,
      checkpointNum: this.data.checkpointNum++,
      checkpointName: this.data.checkpointName,
      times: this.data.times
    }
    if (!data.workshopId) {
      util.showModel("提示","未知车间！")
    } else {
      if (data.checkpointName == '' || data.checkpointName == null) {
        util.showModel("提示","检查点名不能为空！")
      } else {
        if (data.times <= 0 || data.times == '' || data.times == null) {
          util.showModel("提示", "检查次数应大于0且不能为空！")
        } else {
          checkpoint.newCheckpoint(data, function (res) {
            if (res.status == 1) {
              wx.showModal({
                title: '提示',
                content: '创建成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                }
              })
            } else if (res.status == 0) {
              util.showModel("提示", "数据库异常！")
            } else if (res.status == -1) {
              util.showModel("提示", "创建失败，请重试！")
            } else {
              util.showModel("提示", "请求出错！")
            }
          })
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      workshopId: getApp().globalData.showWorkshop.workshopId,
      checkpointNum: getApp().globalData.showWorkshop.totalCheckpoints
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
  
  }
})