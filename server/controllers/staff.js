//server/controllers/staff.js
var staffdb = require('../db/staffdb.js')
var messagedb = require('../db/messagedb.js')
module.exports = {
  verify: async ctx => {
    let req = ctx.request.body
    let res = await staffdb.getStaffByOpenId(req)
    var status
    res.length > 0 ? status = 1 : status = -1
    let result0 = {
      res: res,
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  register: async ctx => {
    let req = ctx.request.body
    let res = await staffdb.newStaff(req)
    var status
    let t = typeof (res)
    t = 'object' ? status = 1 : status = -1
    let result0 = {
      res: res,
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  modifyUserInfo: async ctx => {
    let req = ctx.request.body
    let res = await staffdb.modifyUserInfo(req)
    var status
    let t = typeof (res)
    t = 'object' ? status = 1 : status = -1
    let result0 = {
      res: res,
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  getMessage: async ctx => {
    let req = ctx.request.body
    let res = await messagedb.getMessage(req)
    var readMessage = []
    var notReadMessage = []
    var t = typeof (res)
    var result0
    if (t == 'object' && res.length > 0) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].ifRead == 1) {
          readMessage.push(res[i])
        } else {
          notReadMessage.push(res[i])
        }
      }
      result0 = {
        readMessage: readMessage,
        notReadMessage: notReadMessage,
        status: 1
      }
    } else if (t == 'object' && res.length == 0) {
      result0 = {
        readMessage: [],
        notReadMessage: [],
        status: 1
      }
    } else {
      result0 = {
        status: -1
      }
    }
    
    ctx.body = {
      result: result0
    }
  },
}