// server/controllers/group.js
var groupdb = require('../db/groupdb.js')
var memberdb = require('../db/memberdb.js')
var staffdb = require('../db/staffdb.js')

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {

  getAllGroup: async ctx => { 
    let res = await groupdb.getAllGroup()
    if(typeof(res)=='object' && res.length > 0){
      for (var i = 0; i < res.length; i++) {
        var data = {
          groupId : res[i].groupId
        }
        var res0 = await memberdb.getAdmin(data)
        if (typeof (res0) == 'object') {
          res[i].adminName = new Array()
          for (var j = 0; j < res0.length; j++) {
            var res1 = await staffdb.getStaffByOpenId(res0[j])
            if (typeof (res1) == 'object') {
              status = 1
              res[i].adminName.push(res1[0].name)
            } else {
              status = -1
              break
            }
          }
        } else {
          statu = -1
          break
        }
      }
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
    while (!canNew) {
      pending = parseInt(1000 * Math.random())
      await sleep(pending)
    }
    canNew = 0
    let req = ctx.request.body
    let res = await groupdb.newGroup(req)
    let res0 = await groupdb.getLastGroup(req)
    let groupId = res0[0].groupId
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
      res: res0[0],
      status: status
    }
    canNew = 1
    ctx.body = {
      result: result0
    }
  },

  joinGroup: async ctx => {
    let req = ctx.request.body
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
    var adminList = []
    var superior = []
    var superiorList = []
    var status = 1, tmp
    for (let i = 0; i < res.length; i++) {
      tmp = await staffdb.getStaffByOpenId(res[i])
      if (typeof(tmp) == 'object') {
        if (res[i].label == 0) {
          admin.push(tmp[0])
          adminList.push(tmp[0].openId)
        } else if (res[i].label == 1) {
          staff.push(tmp[0])
        } else {
          superior.push(tmp[0])
          superiorList.push(tmp[0].openId)
        }
      } else {
        status = -1
        break
      }
    }
    let result0 = {
      staff: staff,
      admin: admin,
      adminList: adminList,
      superior: superior,
      superiorList: superiorList,
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
  },
}
