//server/controllers/workshopstatus.js
const workshopdb = require('../db/workshopdb.js')
const inspectdb = require('../db/inspectdb.js')
const checkpointdb = require('../db/checkpointdb.js')
const timesdb = require('../db/timesdb.js')
const groupdb = require('../db/groupdb.js')

module.exports = {
  newWorkshopStatus: async ctx => {
    var res, res0, res1, t, t0, t1, req, req0, status, timesId, result0
    req = ctx.request.body
    res = await workshopdb.getWorkshopInfo(req)
    t = typeof (res)
    if (t == 'object' && res.length > 0) {
      req0 = {
        workshopId: req.workshopId,
        groupId: req.groupId,
        date: req.date,
        status: 0,
        inspectNum: 0,
        checkpointNum: res[0].checkpointNum,
        times: res[0].times
      }
      if (req.checkpointNum == 0) {
        req0.status = 1
      }
      res0 = await timesdb.newtimes(req0)
      t0 = typeof (res0)
      if (t0 == 'object') {
        res1 = await timesdb.getWorkshopInspect0(req)
        t1 = typeof (res0)
        if (t1 == 'object' && res1.length > 0) {
          status = 1
          timesId = res1[res1.length - 1].id
        } else {
          status = 0
        }
      } else {
        status = -1
      }
    } else {
      status = -1
    }
    result0 = {
      status: status,
      timesId: timesId
    }
    ctx.body = {
      result: result0
    }
  },

  getTimes: async ctx => {
    var req, res, t, status, result0
    req = ctx.request.body
    res = await timesdb.getTimes(req)
    t = typeof (res)
    t == 'object' ? status = 1 : status = -1
    result0 = {
      status: status,
      times: res,
    }
    ctx.body = {
      result: result0
    }
  },
}
