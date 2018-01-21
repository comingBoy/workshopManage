//server/controllers/workshop.js
const workshopdb = require('../db/workshopdb.js')
const staffdb = require('../db/staffdb.js')
const checkpointdb = require('../db/checkpointdb.js')
const timesdb = require('../db/timesdb.js')
const groupdb = require('../db/groupdb.js')
const inspectdb = require('../db/inspectdb.js')
const fixdb = require('../db/fixdb.js')

module.exports = {

  getGroupWorkshop: async ctx => {
    let req = ctx.request.body
    var status, res, res0, res1, res2, t, t0, t1, t2, result0, i, j, error
    var info = {
      workshopId: '',
      workshopName: '',
      name: '',
      totalCheckpoints: '',
      error: '',
      inspectTimes: '',
      totalTimes: ''
    }
    var infoQueue = []
    res = await workshopdb.getGroupWorkshop(req)
    t = typeof (res)
    if (t == 'object') {
      if (res.length > 0) {
        for (i = 0; i < res.length; i++) {
          info.totalCheckpoints = res[i].checkpointNum
          info.workshopName = res[i].workshopName
          info.totalTimes = res[i].times
          if (res[i].openId == -1) {
            info.name = '暂无'
          } else {
            res0 = await staffdb.getStaffByOpenId(res[i])
            t0 = typeof(res0)
            if (t0 == 'object') {
              info.name = res0[0].name
            } else {
              status = -1
              break
            }
          }
          req1 = {
            workshopId : res[i].workshopId,
            date : req.date 
          }
          res1 = await inspectdb.getError(req1)
          t1 = typeof (res1)
          if (t1 == 'object') {
            error = 0
            if (res1.length-1 > 0) {
              var date = res1[res1.length - 1].date
              for (j = res1.length - 1; j >= 0; j--) {
                if (date == res1[j].date) {
                  if (res1[j].error == 1) {
                    error++
                  }
                } else {
                  break
                }
              }
            }
            info.error = error
          } else {
            status = -1
            break
          }
          var req0 = {
            date: req.date,
            workshopId: res[i].workshopId
          }
          res2 = await timesdb.getTimes(req0)
          t2 = typeof(res2)
          if (t2 == 'object') {
            info.inspectTimes = res2.length
          } else {
            status = -1
            break
          }
          info.workshopId = res[i].workshopId
          infoQueue.push(info)
          info = {
            workshopId: '',
            workshopName: '',
            name: '',
            totalCheckpoints: '',
            error: '',
            inspectTimes: '',
            totalTimes: ''
          }
        }
        status = 1
      } else {
        status = 0
      }
    } else {
      status = -1
    }

    result0 = {
      status: status,
      res: infoQueue
    }
    console.log(result0)

    ctx.body = {
      result: result0
    }
  },

  newWorkshop: async ctx => {
    let req = ctx.request.body
    var res, res0, res1, res2, res3, t, t0, t1, t2, t3, status, result0
    res = await workshopdb.newWorkshop(req)
    var req0 = {
      groupId: req.groupId,
      workshopId: '',
      status: 0,
      error: 0,
      name: ''
    }
    var req1 = {
      workshopId: ''
    }
    t = typeof (res)
    if (t == 'object') {
      res2 = await workshopdb.getGroupWorkshop(req)
      t2 = typeof (res2)
      if (t2 == 'object') {
        req0.workshopId = res2[res2.length - 1].workshopId
        req1.workshopId = req0.workshopId
        for (let i = 0; i < req.checkpointNum; i++) {
          req0.name = "检查点" + i.toString()
          res0 = await checkpointdb.newCheckpoint(req0)
          t0 = typeof (res0)
          if (t0 != 'object') {
            res1 = await checkpointdb.delAllCheckpoint(req0)
            res3 = await workshopdb.deleteWorkshop(req1)
            t1 = typeof (res1)
            t3 = typeof (res3)
            if (t1 == 'object' && t3 == 'object')
              status = 2
            else
              status = -2
            break
          }
        }
        if (status != 2 && status != -2) {
          status = 1
          result0 = {
            status: status
          }
        } else {
          result0 = {
            status: status
          }
        }
      } else {
        result0 = {
          status: 3
        }
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
  
  getMyWorkshop: async ctx => {
    let req = ctx.request.body
    var status, res, res0, res1, res2, t, t0, t1, t2, result0, i, j, error
    var info = {
      workshopId: '',
      workshopName: '',
      totalCheckpoints: '',
      error: '',
      inspectTimes: '',
      totalTimes: ''
    }
    var infoQueue = []
    res = await workshopdb.getMyWorkshop(req)
    t = typeof (res)
    if (t == 'object') {
      if (res.length > 0) {
        for (i = 0; i < res.length; i++) {
          info.totalCheckpoints = res[i].checkpointNum
          info.workshopName = res[i].workshopName
          info.totalTimes = res[i].times
          req1 = {
            workshopId: res[i].workshopId,
            date: req.date
          }
          res1 = await inspectdb.getError(req1)
          t1 = typeof (res1)
          if (t1 == 'object') {
            error = 0
            if (res1.length - 1 > 0) {
              var date = res1[res1.length - 1].date
              for (j = res1.length - 1; j >= 0; j--) {
                if (date == res1[j].date) {
                  if (res1[j].error == 1) {
                    error++
                  }
                } else {
                  break
                }
              }
            }
            info.error = error
          } else {
            status = -1
            break
          }
          var req0 = {
            date: req.date,
            workshopId: res[i].workshopId
          }
          console.log(req0)
          res2 = await timesdb.getTimes(req0)
          console.log(res2)
          t2 = typeof (res2)
          if (t2 == 'object') {
            info.inspectTimes = res2.length
          } else {
            status = -1
            break
          }
          info.workshopId = res[i].workshopId
          infoQueue.push(info)
          info = {
            workshopId: '',
            workshopName: '',
            totalCheckpoints: '',
            error: '',
            inspectTimes: '',
            totalTimes: ''
          }
        }
        status = 1
      } else {
        status = 0
      }
    } else {
      status = -1
    }

    result0 = {
      status: status,
      res: infoQueue
    }
    console.log(result0)

    ctx.body = {
      result: result0
    }
  },

  getError: async ctx => {
    let req = ctx.request.body
    var res = await inspectdb.getInspect(req)
    var t = typeof(res)
    var status, i, result0, inspect
    var adminError = []
    var staffError = []
    if (t == 'object') {
      status = 1
      for (i = res.length - 1; i >= 0; i--) {
        if ((res[i].error == 1 || res[i].error == 2) && admin ==1) {
          inspect = {
            date: res[i].date,
            inspectId: res[i].inspectId,
            checkpointName: res[i].checkpointName,
            error: res[i].error
          }
          adminError.push(inspect)
        } else if ((res[i].error == 1 || res[i].error == 2) && admin == 0) {
          inspect = {
            date: res[i].date,
            inspectId: res[i].inspectId,
            checkpointName: res[i].checkpointName,
            error: res[i].error
          }
          staffError.push(inspect)
        }
      }
    } else {
      status = -1
    }
    result0 = {
      status : status,
      adminError : adminError,
      staffError : staffError
    }
    ctx.body = {
      result: result0
    }
  },

  getFix: async ctx => {
    var req, res, res0, t, t0, status, result0
    req = ctx.request.body
    res = await inspectdb.getInspect0(req)
    t = typeof (res)
    if (t == 'objetc') {
      res0 = await fixdb.getFix(req)
      t0 = typeof (res0)
      t0 == 'object' ? status = 1 : status = -1
    } else {
      status = -1
    }

    result0 = {
      status: status,
      error: res,
      fix: res0
    }
    ctx.body = {
      result: result0
    }
  },
}