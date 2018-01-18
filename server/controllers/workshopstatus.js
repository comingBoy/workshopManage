//server/controllers/workshopstatus.js
const workshopdb = require('../db/workshopdb.js')
const inspectdb = require('../db/inspectdb.js')
const checkpointdb = require('../db/checkpointdb.js')
const workshopstatusdb = require('../db/workshopstatusdb.js')
const groupdb = require('../db/groupdb.js')

module.exports = {
  newWorkshopStatus: async ctx => {
    var res, res0, res1, t, t0, t1, req, req0, status, workshopStatusId, result0
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
      res0 = await workshopstatusdb.newWorkshopStatus(req0)
      t0 = typeof (res0)
      if (t0 == 'object') {
        res1 = await workshopstatusdb.getWorkshopInspect0(req)
        t1 = typeof (res0)
        if (t1 == 'object' && res1.length > 0) {
          status = 1
          workshopStatusId = res1[res1.length - 1].id
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
      workshopStatusId: workshopStatusId
    }
    ctx.body = {
      result: result0
    }
  },
}
