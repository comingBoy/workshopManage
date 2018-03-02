// pages/newWorkshop/newWorkshop.js
var util = require('../../utils/util.js')
var group = require('../../utils/group.js')
var workshop = require('../../utils/workshop.js')
var workshopInfo = null
var urls = {
  groupIndex: '../group/group'
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    staffList: null,
    index :0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    workshopInfo = {
      workshopName: null,
      openId: null,
      checkpointNum: null,
      groupId: null,
    } 
    var that = this
    var data = {
      groupId: getApp().globalData.currentGroup.groupId
    }
    group.getStaff(data, function (res) {
      if (res.status == 1) {
        var staffList = new Array()
        staffList.push.apply(staffList, res.admin)
        staffList.push.apply(staffList, res.superior)
        staffList.push.apply(staffList, res.staff)
        staffList.unshift({
          name: "暂无",
          openId: '-1'
        })

        that.setData({
          staffList: staffList,
        })
      } else if (res.status == -1) {
        util.showModel("提示","获取失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
      
    })
    workshopInfo.groupId = getApp().globalData.currentGroup.groupId
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
  chooseopenId: function (e) {
    this.setData({
      index: e.detail.value
    })
    workshopInfo.openId = this.data.staffList[e.detail.value].openId
  },
  getCheckpointNum: function (e) {
    workshopInfo.checkpointNum = e.detail.value
    if (workshopInfo.checkpointNum != null && workshopInfo.checkpointNum != "" && workshopInfo.workshopName != null && workshopInfo.workshopName != "") {
      this.setData({
        flag: true
      })
    } else {
      this.setData({ flag: false })
    }
  },
  getWorkshopName: function (e) {
    workshopInfo.workshopName = e.detail.value
    if (workshopInfo.checkpointNum != null && workshopInfo.checkpointNum != "" && workshopInfo.workshopName != null && workshopInfo.workshopName != "") {
      this.setData({
        flag: true
      })
    } else {
      this.setData({ flag: false })
    }
  },

  newWorkshop: function (e) {
    if (workshopInfo.checkpointNum != null && workshopInfo.checkpointNum != "" && workshopInfo.workshopName != null && workshopInfo.workshopName != "") {
      if(workshopInfo.openId == null) workshopInfo.openId = '-1'
      workshop.newWorkshop(workshopInfo,urls)
    } else {
      util.showModel("失败", "请完善信息")
    }
  }
})