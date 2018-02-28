const checkpointdb = require('../db/checkpointdb.js')
const workshopdb = require('../db/workshopdb.js')
const inspectdb = require('../db/inspectdb.js')
module.exports = {
  getCheckpoint: async ctx => {
    let req = ctx.request.body
    let res = await checkpointdb.getCheckpointInfo(req)
    var status, result0
    let t = typeof (res)
    if (t == 'object') {
      res.length > 0 ? status = 1 : status = 0
    } else {
      status: -1
    }
    result0 = {
      status : status,
      res : res
    }
    ctx.body = {
      result: result0
    }
  },

  getCheckpoint0: async ctx => {
    var req, req0, res, res0, t, t0, status, result0
    var info = {
      checkpointId: '',
      checkpointName: '',
      error: '',
      inspectTimes: 0,
      totalTimes: 0
    }
    var infoQueue = []
    req = ctx.request.body
    res = await checkpointdb.getCheckpointInfo(req)
    t = typeof (res)
    if (t == 'object' && res.length > 0) {
      for (var i = 0; i < res.length; i++) {
        info.checkpointId = res[i].checkpointId
        info.checkpointName = res[i].name
        info.totalTimes = res[i].times
        res0 = await inspectdb.getLastInspect(res[i])
        t0 = typeof (res0)
        if (t0 == 'object') {
          if (res0.length == 0) {
            info.error = 0
          } else {
            info.error = res0[0].error
          }
        } else {
          status = -1
          break
        }
        req0 = {
          checkpointId: res[i].checkpointId,
          date: req.date
        }
        res0 = await inspectdb.getCheck(req0)
        t0 = typeof (res0)
        if (t0 == 'object') {
          for (var j = 0; j < res0.length; j++) {
            if (res0[j].admin == 0) {
              info.inspectTimes++
            }
          }
        } else {
          status = -1
          break
        }
        infoQueue.push(info)
        info = {
          checkpointId: '',
          checkpointName: '',
          error: '',
          inspectTimes: 0,
          totalTimes: 0
        }
      }
      status = 1
    } else if (t == 'object' && res.length == 0) {
      status = 0
    } else {
      status = -1
    }
    result0 = {
      status: status,
      res: infoQueue
    }
    ctx.body = {
      result: result0
    }
  },

  getCheckDetail: async ctx => {
    var req, req0, res, res0, t, t0, status, result0
    req = ctx.request.body
    res = await inspectdb.getCheck(req)
    t = typeof (res)
    if (t == 'object' && res.length > 0) {
      status = 1
    } else if (t == 'object' && res.length == 0) {
      status = 0
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

  changeCheckpointInfo: async ctx => {
    let req = ctx.request.body
    let res = await checkpointdb.changeCheckpointInfo(req)
    var status, result0
    let t = typeof (res)
    t == 'object' ? status = 1 : status = -1
    result0 = {
      status: status,
    }
    ctx.body = {
      result: result0
    }
  },

  delCheckpoint: async ctx => {
    var req, res, res0, t, t0, status, result0
    req = ctx.request.body
    res = await checkpointdb.delCheckpoint(req)
    res0 = await workshopdb.changeCheckpointNum(req)
    t = typeof (res)
    t0 = typeof (res0)
    if (t == 'object' && t0 == 'object') {
      status = 1
    } else if (t != 'object' && t0 != 'object') {
      status = 0
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

  newCheckpoint: async ctx => {
    var req, res, res0, t, t0, status, result0
    req = ctx.request.body
    res = await workshopdb.changeCheckpointNum(req)
    t = typeof (res)
    if (t == 'object') {
      res = await checkpointdb.newCheckpoint(req)
      t = typeof (res)
      if (t == 'object') {
        status = 1
      } else {
        req.checkpointNum--
        res = await workshopdb.changeCheckpointNum(req)
        t = typeof (res)
        t == 'object' ? status = -1 : status = 0
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

}
