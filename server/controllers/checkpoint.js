//server/controllers/checkpoint.js
const checkpointdb = require('../db/checkpointdb.js')
module.exports = {
  getCheckpoint: async ctx => {
    let req = ctx.request.body
    let res = await checkpointdb.getCheckpointInfo(req)
    var status, result0
    let t = typeof (res)
    if (t == 'object') {
      if (res.length > 0) {
        result0 = {
          status: 1,
          res: res
        }
      } else {
        result0 = {
          status: 0
        }
      }
    } else {
      result0 = {
        status: -1,
        res, res
      }
    }
    ctx.body = {
      result: result0
    }
  },
}
