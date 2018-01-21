const checkpointdb = require('../db/checkpointdb.js')
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
}
