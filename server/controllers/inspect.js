//server/controllers/inspect.js
const inspectdb = require('../db/inspectdb.js')
const staffdb = require('../db/staffdb.js')
const workshopdb = require('../db/workshopdb.js')
const timesdb = require('../db/timesdb.js')
const checkpointdb = require('../db/checkpointdb.js')
const fixdb = require('../db/fixdb.js')

module.exports = {

  getInspect: async ctx => {
    let req = ctx.request.body
    var res, t, result0, status
    res = await timesdb.getTimes(req)
    t = typeof (res)
    if (t == 'object') {
      res.length > 0 ? status = 1 : status = 0
    } else {
      status = -1
    }
    result0 = {
      status : status,
      res : res
    }
    ctx.body = {
      result: result0
    }
  },

  getInspectById: async ctx => {
    let req = ctx.request.body
    var res, t, result0, status
    res = await inspectdb.getInspectById(req)
    t = typeof (res)
    t == 'object' ? status = 1 : status = -1
    
    result0 = {
      status: status,
      res: res
    }
    ctx.body = {
      result: result0
    }
  },

  newProgress: async ctx => {
    let req = ctx.request.body
    var res, res0, t, t0, req0, status, result0, allInspected
    res = await checkpointdb.getCheckpointInfo(req)
    t = typeof (res)
    if (t == 'object') {
      if (res.length > 0) {
        status = 1
        allInspected = 1
        for (let i = 0; i < res.length; i++) {
          if (res[i].status == 0) {
            allInspected = 0
            break
          }
        }
        if (allInspected == 1) {
          req0 = {
            workshopId: req.workshopId,
            status: 0
          }
          res0 = await inspectdb.refreshStatus(req0)
          t0 = typeof (res0)
          t0 = 'object' ? status = 1 : status = -1
        }
      } else {
        status = 0
      }
    } else {
      status = -1
    }
    result0 = {
      status: status,
      allInspected: allInspected,
    }
    ctx.body = {
      result: result0
    }
  },

  getInspectHis: async ctx => {
    var req, res, t, status, result0
    req = ctx.request.body
    res = await inspectdb.getInspectHis(req)
    t = typeof (res)
    t == 'object' ? status = 1 : status = -1
    result0 = {
      status: status,
      res: res
    }
    ctx.body = {
      result: result0
    }
  },

  getInspectTimes: async ctx => {
    var req, res, t, status, result0
    req = ctx.request.body
    res = await inspectdb.getInspectTimes(req)
    t = typeof (res)
    t == 'object' ? status = 1 : status = -1
    result0 = {
      status: status,
      res: res
    }
    ctx.body = {
      result: result0
    }
  },

  fixError: async ctx => {
    var res, res0, req, req0, t, t0, status, result0
    req = ctx.request.body
    res = await fixdb.fixError(req)
    t = typeof (res)
    if (t == 'object') {
      req0 = {
        error : 2,
        inspectId : req.inspectId
      }
      res0 = await inspectdb.refreshStatus(req0)
      t0 = typeof (res0)
      if (t0 == 'object') {
        status = 1
      } else {
        res = await fixdb.delFix(req)
        t = typeof (res)
        if (t == 'object') {
          status = -1
        } else {
          status = 0
        }
      } 
    } else {
      status = -1
    }
    
    result0 = {
      status: status,
    }
    ctx.body = {
      result: result0
    }
  },

  inspect: async ctx => {
    var req, res, t, result0, status,
    req = ctx.request.body
    res = await inspectdb.inspect(req)
    t = typeof (res)
    status = t == 'object' ? 1 : -1
    result0 = {
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  inspect0: async ctx => {
    var req, res, t, result0, status
    req = ctx.request.body
    res = await inspectdb.inspect(req.inspectArray)
    t = typeof (res)
    t == 'object' ? status = 1 : status = -1
    result0 = {
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  getError: async ctx => {
    var req, res, t, result0, status
    req = ctx.request.body
    res = await inspectdb.inspect(req.inspectArray)
    t = typeof (res)
    t == 'object' ? status = 1 : status = -1
    result0 = {
      status: status
    }
    ctx.body = {
      result: result0
    }
  },

  getLastInspect: async ctx => {
    let req = ctx.request.body
    var res, t, result0, status
    res = await inspectdb.getLastInspect(req)
    t = typeof (res)
    if (t == 'object') {
      res.length > 0 ? status = 1 : status = 0
    } else {
      status = -1
    }
    result0 = {
      status: status,
      res: res
    }
    ctx.body = {
      result: result0
    }
  },
}