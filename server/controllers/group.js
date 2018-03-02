// server/controllers/group.js
var groupdb = require('../db/groupdb.js')
var memberdb = require('../db/memberdb.js')
var staffdb = require('../db/staffdb.js')
module.exports = {

  getAllGroup: async ctx => { 
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
      groupId: groupId,
      label: 0,
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
    //初始化等级为1 员工
    req.label = 1
    console.log(req)
    var result0
    var status
    let res = await groupdb.getGroupCode(req)
    if (res[0].groupCode == req.groupCode) {
      console.log(req)
      let res0 = await memberdb.joinGroup(req)
      console.log(res0)
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
    res.length > 0 ? status = -1 : status = 1
    let result0 = {
      res: res,
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  getSuperior: async ctx => {
    let req = ctx.request.body
    let res = await memberdb.getSuperior(req)
    var t = typeof(res)
    var result0
    if (t == 'object' && res.length > 0) {
      result0 = {
        res: res,
        status: 1
      }
    } else if (t == 'object' && res.length == 0) {
      result0 = {
        status: 0
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

  getStaff: async ctx => {
    let req = ctx.request.body
    let res = await memberdb.getStaff(req)
    var staff = []
    var admin = []
    var superior = []
    var status = 1, tmp
    for (let i = 0; i < res.length; i++) {
      tmp = await staffdb.getStaffByOpenId(res[i])
      if (typeof(tmp) == 'object') {
        if (res[i].label == 0) {
          admin.push(tmp[0])
        } else if (res[i].label == 1) {
          staff.push(tmp[0])
        } else {
          superior.push(tmp[0])
        }
      } else {
        status = -1
        break
      }
    }
    let result0 = {
      staff: staff,
      admin: admin,
      superior: superior,
      status: status
    }
    ctx.body = {
      result: result0
    }
  },
  
  delStaff: async ctx => {
    let req = ctx.request.body
    let res = await memberdb.delStaff(req)
    let t = typeof(res)
    let status = t == 'object' ? 1 : -1
    let result0 = {
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  delGroup: async ctx => {
    let req = ctx.request.body
    let res = await groupdb.delGroup(req)
    let t = typeof (res)
    var status, result0
    t == 'object' ? status = 1 : status = -1
    result0 = {
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  modifyGroup: async ctx => {
    let req = ctx.request.body
    let res = await groupdb.modifyGroup(req)
    let t = typeof (res)
    var status, result0
    t == 'object' ? status = 1 : status = -1
    result0 = {
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

    setLevel: async ctx => {
    let req = ctx.request.body
    let res = await memberdb.setLevel(req)
    let t = typeof (res)
    var status, result0
    t == 'object' ? status = 1 : status = -1
    result0 = {
      status: status
    }
    ctx.body = {
      result: result0
    }
  }
}
