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
    console.log(req)
    res = await inspectdb.getInspectHis(req)
    console.log(res)
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
    if (res == 'object') {
      req0 = {
        status : 2,
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
    var req, req0, res, res0, t, t0, result0, status, i, j
    req = ctx.request.body
    res = await timesdb.newTimes(req.inspectArray[0])
    t = typeof (res)
    if (t == 'object') {
      res0 = await timesdb.getTimes0(req.inspectArray[0])
      t0 = typeof (res0)
      if (t0 == 'object' && res0.length > 0) {
        status = 1
        for (i = 0; i < req.inspectArray.length; i++) {
          req0 = req.inspectArray[i]
          req0.timesId = res0[res0.length-1].timesId
          res = await inspectdb.inspect(req0)
          t = typeof (res)
          if (t == 'object') {
          } else {
            status = -1
            res = await timesdb.delTimes(req.inspectArray[0])
            t = typeof (res)
            if (t == 'object') {
              for (j = i - 1; j >= 0; j--) {
                res = await inspectdb.delInspect(req.inspectArray[j])
                t = typeof (res)
                if (t != 'object') {
                  status = 0
                  break
                }
              }
            } else {
              status = 0
              break
            }
            break
          }
        }
      } else {
        status = 0
      }
    } else {
      status = -1
    }
    
    result0 = {
      status: status
    }
    ctx.body = {
      result: result0
    }
  },
}