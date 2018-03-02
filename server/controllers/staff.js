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

  leaveMessage: async ctx => {
    let req = ctx.request.body
    let res = await messagedb.leaveMessage(req)
    var status
    let t = typeof (res)
    t = 'object' ? status = 1 : status = -1
    let result0 = {
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  getMyMessage: async ctx => {
    var result0, index, message, req, req0, res, res0, t
    var status
    var myMessage = []
    var superiorList = []
    req = ctx.request.body
    res = await messagedb.getMessage(req)
    t = typeof (res)
    if (t == 'object' && res.length > 0) {
      status = 1
      res.reverse()
      for (var i = 0; i < res.length; i++) {
        index = superiorList.indexOf(res[i].superiorId)
        if(index == -1) {
          superiorList.push(res[i].superiorId)
          req0 = {
            openId: res[i].superiorId
          }
          res0 = await staffdb.getStaffByOpenId(req0)
          if (typeof (res0) == 'object') {
            message = {
              superiorInfo: res0[0],
              ifRead: res[i].ifRead,
              message: [{
                date: res[i].date,
                message: res[i].message,
                ifRead: res[i].ifRead
              }]
            }
            myMessage.push(message)
          } else {
            status = -1
            break
          }

        } else {
          message = {
            date: res[i].date,
            message: res[i].message,
            ifRead: res[i].ifRead
          }
          myMessage[index].message.push(message)
          myMessage[index].ifRead = myMessage[index].ifRead && res[i].ifRead
        }
      }
    } else if (t == 'object' && res.length == 0) {
      status = 0
    } else {
      status = -1
    }

    result0 = {
      status: status,
      myMessage: myMessage
    }

    ctx.body = {
      result: result0
    }
  },

  readMessage: async ctx => {
    let req = ctx.request.body
    let res = await messagedb.readMessage(req)
    var status
    let t = typeof (res)
    t = 'object' ? status = 1 : status = -1
    let result0 = {
      status: status
    }
    ctx.body = {
      result: result0
    }
  },
}