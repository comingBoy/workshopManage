// server/controllers/group.js
var groupdb = require('../db/groupdb.js')
var memberdb = require('../db/memberdb.js')
var staffdb = require('../db/staffdb.js')
module.exports = {

  getAllGroup: async ctx => { //function(ctx){}
    let res = await groupdb.getAllGroup()
    if(typeof(res)=='object' && res.length > 0){
      for (var i = 0; i < res.length; i++) {
        var data = {
          openId : res[i].adminId
        }
        var res0 = await staffdb.getStaffByOpenId(data)
        res[i].adminName = res0[0].name
      }
    }
    var status
    let t = typeof (res)
    if (t == 'object') {
      res.length > 0 ? status = 1 : status = 0
    } else {
      status = -1
    }
    let result0 = {
      res: res,
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  newGroup: async ctx => {
    let req = ctx.request.body
    let res = await groupdb.newGroup(req)
    let res0 = await groupdb.getAdminGroup(req)
    let len = res0.length
    let groupId = res0[len - 1].groupId
    let req0 = {
      openId: req.adminId,
      groupId: groupId
    }
    await memberdb.joinGroup(req0)
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

  joinGroup: async ctx => {
    let req = ctx.request.body
    console.log(req)
    var result0
    var status
    let res = await groupdb.getGroupCode(req)
    if (res[0].groupCode == req.groupCode) {
      let res0 = await memberdb.joinGroup(req)
      let t = typeof (res0)
      t = 'object' ? status = 1 : status = -1
      result0 = {
        res: res0,
        status: status
      }
    } else {
      result0 = {
        res: '',
        status: 0
      }
    }
    ctx.body = {
      result: result0
    }
  },

  verifyStaff: async ctx => {
    let req = ctx.request.body
    let res = await memberdb.verifyStaff(req)
    var status
    console.log(req)
    console.log(res)
    res.length > 0 ? status = -1 : status = 1
    let result0 = {
      res: res,
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  getStaff: async ctx => {
    let req = ctx.request.body
    let res = await memberdb.getStaff(req)
    var staff = []
    var status
    for (let i = 0; i < res.length; i++) {
      let tmp = await staffdb.getStaffByOpenId(res[i])
      staff.push(tmp[0])
    }
    staff.length > 0 ? status = 1 : status = -1
    if (staff.length > 0) {
      status = 1
    } else if (staff.length == 0) {
      status = 0
    } else {
      status = -1
    }
    let result0 = {
      res: staff,
      status: status
    }
    ctx.body = {
      result: result0
    }
  },
  
  delStaff: async ctx => {
    let req = ctx.request.body
    console.log(req)
    let res = await memberdb.delStaff(req)
    ctx.body = {
      result: res
    }
  }
}
