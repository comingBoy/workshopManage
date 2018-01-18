//server/controllers/workshop.js
const workshopdb = require('../db/workshopdb.js')
const staffdb = require('../db/staffdb.js')
const checkpointdb = require('../db/checkpointdb.js')
const workshopstatusdb = require('../db/workshopstatusdb.js')
const groupdb = require('../db/groupdb.js')

module.exports = {
  //server/controllers/workshop.js
  getGroupWorkshop: async ctx => {
    let req = ctx.request.body
    var status, res, res0, res1, res2, t, t0, t1, t2, result0
    var info = {
      workshopName: '',
      name: '',
      totalCheckpoints: '',
      normal: '',
      abnormal: '',
      inspectTimes: '',
      totalTimes: ''
    }
    var infoQueue = []
    res = await workshopdb.getGroupWorkshop(req)
    t = typeof (res)
    if (t == 'object') {
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].openId == -1){
            res0 = [
              {
                name : "暂无",
                openId : -1,
              }
            ]
          }else{
            res0 = await staffdb.getStaffByOpenId(res[i])
          }
          
          res1 = await checkpointdb.getCheckpoint(res[i])
          info.totalCheckpoints = res[i].checkpointNum
          info.workshopName = res[i].workshopName
          var req0 = {
            date: req.date,
            workshopId: res[i].id
          }
          res2 = await workshopstatusdb.getWorkshopInspect(req0)
          var normal = 0, abnormal = 0
          info.openId = res0.openId
          t0 = typeof (res0)
          t1 = typeof (res1)
          t2 = typeof (res2)
          if (t0 == 'object' && t1 == 'object' && t2 == 'object') {
            if (res0.length > 0) {
              info.name = res0[0].name
            }
            info.inspectTimes = res2.length
            info.totalTimes = res[i].times
            for (let j = 0; j < res1.length; j++) {
              if (res1[j].error == 0)
                normal++
              else
                abnormal++
            }
            info.normal = normal
            info.abnormal = abnormal
          } else {
            result0 = {
              status: -1
            }
          }
          console.log(info)
          infoQueue.push(info)
          info = {
            workshopName: '',
            name: '',
            totalCheckpoints: '',
            normal: '',
            abnormal: '',
            inspectTimes: '',
            totalTimes: ''
          }
        }
        result0 = {
          res: infoQueue,
          status: 1
        }
      } else {
        result0 = {
          status: 0
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
      id: ''
    }
    t = typeof (res)
    if (t == 'object') {
      res2 = await workshopdb.getGroupWorkshop(req)
      t2 = typeof (res2)
      if (t2 == 'object') {
        req0.workshopId = res2[res2.length - 1].id
        req1.id = req0.workshopId
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
    var status, res, res0, res1, res2, t, t0, t1, t2, result0
    var info = {
      id: '',
      workshopName: '',
      name: '',
      totalCheckpoints: '',
      normal: '',
      abnormal: '',
      inspectTimes: '',
      totalTimes: ''
    }
    var infoQueue = []
    res = await workshopdb.getMyWorkshop(req)
    t = typeof (res)
    if (t == 'object') {
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].openId == -1) {
            res0 = [
              {
                name: "暂无",
                openId: -1,
              }
            ]
          } else {
            res0 = await staffdb.getStaffByOpenId(res[i])
          }

          res1 = await checkpointdb.getCheckpoint(res[i])
          info.totalCheckpoints = res[i].checkpointNum
          info.workshopName = res[i].workshopName
          info.id = res[i].id
          var req0 = {
            date: req.date,
            workshopId: res[i].id
          }
          res2 = await workshopstatusdb.getWorkshopInspect(req0)
          var normal = 0, abnormal = 0
          info.openId = res0.openId
          t0 = typeof (res0)
          t1 = typeof (res1)
          t2 = typeof (res2)
          if (t0 == 'object' && t1 == 'object' && t2 == 'object') {
            if (res0.length > 0) {
              info.name = res0[0].name
            }
            info.inspectTimes = res2.length
            info.totalTimes = res[i].times
            for (let j = 0; j < res1.length; j++) {
              if (res1[j].error == 0)
                normal++
              else
                abnormal++
            }
            info.normal = normal
            info.abnormal = abnormal
          } else {
            result0 = {
              status: -1
            }
          }
          console.log(info)
          infoQueue.push(info)
          info = {
            workshopName: '',
            name: '',
            totalCheckpoints: '',
            normal: '',
            abnormal: '',
            inspectTimes: '',
            totalTimes: ''
          }
        }
        result0 = {
          res: infoQueue,
          status: 1
        }
      } else {
        result0 = {
          status: 0
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
}