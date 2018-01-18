//server/controllers/inspect.js
const inspectdb = require('../db/inspectdb.js')
const staffdb = require('../db/staffdb.js')
const workshopdb = require('../db/workshopdb.js')
const workshopstatusdb = require('../db/workshopstatusdb.js')
const checkpointdb = require('../db/checkpointdb.js')

module.exports = {
  getInspect: async ctx => {
    let req = ctx.request.body
    var res, res0, res1, t, t0, t1, timesStatus, repaireStatus, progressStatus, result0
    var progress = {
      workshopStatusId: '',
      date: '',
      inspectNum: '',
      checkpointNum: ''
    }
    var repaired = {
      checkpointName: '',
      status: ''
    }
    var notrepaired = {
      checkpointName: '',
      status: ''
    }
    var totalTimes, inspectTimes = 0, date
    var progressQueue = []
    var repairedQueue = []
    var notrepairedQueue = []
    res = await workshopstatusdb.getWorkshopInspect(req)
    t = typeof (res)
    if (t == 'object') {
      if (res.length > 0) {
        ProgressStatus = 1
        totalTimes = res[res.length - 1].times
        for (var i = 0; i < res.length; i++) {
          var progress = new Object
          progress.date = res[i].date
          progress.workshopStatusId = res[i].id
          progress.checkpointNum = res[i].checkpointNum
          progress.inspectNum = res[i].inspectNum
          console.log(res)
          console.log(progress)
          progressQueue.push(progress)
          console.log(progressQueue)
          if (res[i].status == 1) {
            inspectTimes++
          }
        }
      } else {
        ProgressStatus = 0
      }
      if (req.thisMonth) {
        res0 = await workshopdb.getWorkshopInfo(req)
        t0 = typeof (res0)
        if (t0 == 'object') {
          timesStatus = 1
          totalTimes = res0[0].times
        } else {
          timesStatus = -1
        }
      }
    } else {
      progressStatus: -1
    }
    res1 = await inspectdb.getInspect(req)
    t1 = typeof (res1)
    if (t1 == 'object') {
      repairedStatus = 1
      for (var i = 0; i < res1.length; i++) {
        if (res1[i].status == 1) {
          notrepaired.admin = res1[j].admin
          notrepaired.checkpointName = res1[i].checkpointName
          notrepaired.status = "未修复"
          notrepairedQueue.push(notrepaired)
        } else if (res1[i].status == 2) {
          notrepaired.admin = res1[j].admin
          repaired.checkpointName = res1[i].checkpointName
          repaired.status = "已修复"
          repairedQueue.push(repaired)
        }
      }
    } else {
      repairedStatus = -1
    }
    result0 = {
      timesStatus: timesStatus,
      progressStatus: progressStatus,
      repairedStatus: repaireStatus,
      inspectTimes: inspectTimes,
      totalTimes: totalTimes,
      progressQueue: progressQueue,
      repairedQueue: repairedQueue,
      notrepaireQueue: notrepairedQueue
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
    let req = ctx.request.body
    let res = await inspectdb.getInspectHis(req)
    var result0, status
    let t = typeof (res)
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