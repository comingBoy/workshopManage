const checkpointdb = require('../db/checkpointdb.js')
const workshopdb = require('../db/workshopdb.js')
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
