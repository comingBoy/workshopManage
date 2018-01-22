// client/utils/net.js
var util = require('../utils/util.js')
var config = require('../config.js')

function request(data, config, callback) {
  wx.request({
    url: config.url,
    data: data,
    method: config.method,
    header: config.header,
    success: function (res) {
      callback(res)
    },
    fail: function (res) {
      callback(res)
    }
  })
}

function uploadImgByCamera(callback) {
  wx.chooseImage({
    count: 1,
    sizeType: "compressed",
//    sourceType: "camera",
    success: function (res) {
      wx.uploadFile({
        url: config.service.uploadImgUrl,
        filePath: res.tempFilePaths[0],
        name: 'file',
        success: function (res) {
          util.showSuccess('上传图片成功')
          res = JSON.parse(res.data)
          callback(res.data.imgUrl)
        },
        fail: function (e) {
          util.showModel('提示', '上传图片失败')
        }
      })
    },
  })
}

function uploadImgByAlbum(callback) {
  wx.chooseImage({
    count: 1,
    sizeType: "compressed",
//    sourceType: "album",
    success: function (res) {
      wx.uploadFile({
        url: config.service.uploadImgUrl,
        filePath: res.tempFilePaths[0],
        name: 'file',
        success: function (res) {
          util.showSuccess('上传图片成功')
          res = JSON.parse(res.data)
          callback(res.data.imgUrl)
        },
        fail: function (e) {
          util.showModel('提示', '上传图片失败')
        }
      })
    },
  })
}

function uploadImg(callback) {
  wx.chooseImage({
    count: 1,
    sizeType: "compressed",
    success: function (res) {
      wx.uploadFile({
        url: config.service.uploadImgUrl,
        filePath: res.tempFilePaths[0],
        name: 'file',
        success: function (res) {
          util.showSuccess('上传图片成功')
          res = JSON.parse(res.data)
          callback(res.data.imgUrl)
        },
        fail: function (e) {
          util.showModel('提示', '上传图片失败')
        }
      })
    },
  })
}

module.exports = {
  request: request,
  uploadImg: uploadImg,
  uploadImgByCamera: uploadImgByCamera,
  uploadImgByAlbum: uploadImgByAlbum
}

