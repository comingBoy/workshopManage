//server/controllers/staff.js
var staffdb = require('../db/staffdb.js')
module.exports = {
  verify: async ctx => {
    console.log(123)
    console.log(ctx.request.body)
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
    console.log(req)
    let res = await staffdb.modifyUserInfo(req)
    console.log(res)
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
  }
}