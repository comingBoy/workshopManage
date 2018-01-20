// pages/member/member.js
var group = require('../../utils/group.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffList: null,
    admin: null
  },


  deleteMember:function(e){
    if (getApp().globalData.myInfo.openId == getApp().globalData.currentGroup.adminId){
      var that = this
      var data = {
        openId: that.data.staffList[e.currentTarget.id].openId,
        groupId: getApp().globalData.currentGroup.groupId
      }
      group.delStaff(data, function (res) {
        console.log(res)
        var staffList = that.data.staffList
        staffList.splice(e.currentTarget.id, 1)
        that.setData({
          staffList: staffList
        })
      })
    }else{
      util.showModel('提示', '您不是管理员！')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(getApp().globalData.currentGroup)
    var data = {
      groupId: getApp().globalData.currentGroup.groupId
    }
    group.getStaff(data,function(res){
      var staffList = res
      var admin = null
      for(var i = 0; i < staffList.length; i++){
        if(staffList[i].openId == getApp().globalData.currentGroup.adminId){
          admin = staffList[i]
          staffList.splice(i,1)
          break
        }
      }
      that.setData({
        staffList: staffList,
        admin: admin
      })
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