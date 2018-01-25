// pages/modifyWorkshop/modifyWorkshop.js
var workshop = require('../../utils/workshop.js')
var util = require('../../utils/util.js')
var checkpoint = require('../../utils/checkpoint.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workshopId: '',
    workshopInfo: null,
    checkpointInfo: [],
    checkpointId: '',
    changeFlag0: true,
    changeFlag: true,
    workshopName: '',
    checkpointName: '',
    changeWhat: [
      "更改车间名",
      "更改检查点名"
    ],
    index: null,
    index0: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var workshopId = options.workshopId
    this.setData({
      workshopId: workshopId
    })
    var data = {
      workshopId: workshopId
    }
    workshop.getWorkshopInfo(data, function(res) {
      console.log(res)
      if (res.status == 1) {
        that.setData({
          workshopInfo: res.res
        })
      } else if (res.status == -1) {
        util.showModel("提示","请求失败，请重试！")
      } 
      else {
        util.showModel("提示","请求出错！")
      }
    })
    checkpoint.getCheckpoint(data, function(res) {
      console.log(res)
      if (res.status == 1) {
        that.setData({
          checkpointInfo: res.res
        })
      } else if (res.status == -1) {
        util.showModel("提示", "请求失败，请重试！")
      }
      else {
        util.showModel("提示", "请求出错！")
      }
    })
  },

  goBack: function() {
    wx.navigateBack({
      delta: 1,
    })
  },

  delWorkshop: function() {
    var workshopId = this.data.workshopId
    var data = {
      workshopId: workshopId
    }
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          workshop.delWorkshop(data, function (res) {
            console.log(res)
            if (res.status == 1) {
              wx.showModal({
                title: '提示',
                content: '删除成功！',
                showCancel: false,
                success: function (res) {
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              })
            } else if (res.status == 0) {
              util.showModel("提示", "数据库异常！")
            } else if (res.status == -1) {
              util.showModel("提示", "删除失败，请重试！")
            } else {
              util.showModel("提示", "请求出错！")
            }
          })
        }
      }
    })
  },

  delCheckpoint: function () {
    var that = this
    var checkpointId = that.data.checkpointId
    var workshopId = that.data.workshopId
    var checkpointNum = that.data.checkpointInfo.length-1
    var data = {
      checkpointId: checkpointId,
      workshopId: workshopId,
      checkpointNum: checkpointNum
    }
    console.log(data)
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          checkpoint.delCheckpoint(data, function (res) {
            console.log(res)
            if (res.status == 1) {
              wx.showModal({
                title: '提示',
                content: '删除成功！',
                showCancel: false,
                success: function (res) {
                  var checkpointInfo = that.data.checkpointInfo
                  checkpointInfo.splice(that.data.index,1)
                  that.setData({
                    checkpointInfo: checkpointInfo,
                    changeFlag0: true,
                    changeFlag: true
                  })
                }
              })
            } else if (res.status == 0) {
              util.showModel("提示", "数据库异常！")
            } else if (res.status == -1) {
              util.showModel("提示", "删除失败，请重试！")
            } else {
              util.showModel("提示", "请求出错！")
            }
          })
        }
      }
    })
  },

  changeWorkshop: function(){
    this.setData({
      changeFlag0: false,
      changeFlag: true,
      index0: 0
    })
  },

  changeCheckpoint: function(e) {
    console.log(e)
    var checkpointId = this.data.checkpointInfo[e.currentTarget.id].checkpointId
    this.setData({
      changeFlag0: true,
      changeFlag: false,
      index0: 1,
      checkpointId: checkpointId,
      index: e.currentTarget.id
    })
  },
  
  changeSave0: function(e){
    var that = this
    var workshopName = that.data.workshopName
    var workshopId = that.data.workshopId
    if (workshopName == '' || workshopName == null) {
      util.showModel("提示","车间名不能为空！")
    } else {
      var data = {
        workshopId: workshopId,
        workshopName: workshopName
      }
      workshop.changeWorkshopInfo(data, function(res) {
        if (res.status == 1) {
          var workshopInfo = that.data.workshopInfo
          workshopInfo[0].workshopName = workshopName
          that.setData({
            workshopInfo: workshopInfo
          })
          util.showModel("提示", "修改成功！")
        } else if (res.status == -1) {
          util.showModel("提示", "修改失败，请重试！")
        } else {
          util.showModel("提示", "请求出错！")
        }
      })
    }
  },

  changeSave: function (e) {
    var that = this
    var checkpointName = that.data.checkpointName
    var checkpointId = that.data.checkpointId
    if (checkpointName == '' || checkpointName == null) {
      util.showModel("提示", "检查点名不能为空！")
    } else {
      var data = {
        checkpointId: checkpointId,
        checkpointName: checkpointName
      }
      checkpoint.changeCheckpointInfo(data, function(res) {
        if (res.status == 1) {
          var checkpointInfo = that.data.checkpointInfo
          checkpointInfo[that.data.index].name = checkpointName
          that.setData({
            checkpointInfo: checkpointInfo
          })
          util.showModel("提示","修改成功！")

        } else if (res.status == -1) {
          util.showModel("提示", "修改失败，请重试！")
        } else {
          util.showModel("提示","请求出错！")
        }
      })
    }
  },

  input0: function (e) {
    var workshopName = e.detail.value
    this.setData({
      workshopName: workshopName
    })
  },

  input: function(e) {
    var checkpointName = e.detail.value
    this.setData({
      checkpointName: checkpointName,
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