//server/db/workshopstatusdb.js
const mysqlHelper = require("./mysql-helper.js")
const config = require('./config.js')

module.exports = {
  //查看车间检查状态
  async getWorkshopInspect(args) {
    let sql = 'SELECT * FROM workshopstatusdb where workshopId = ? and date REGEXP ?'
    let params = [args.workshopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //新建车间状态
  async newWorkshopStatus(args) {
    let sql = 'INSERT INTO workshopstatusdb(workshopId,groupId,date,status,inspectNum,checkpointNum,times) VALUE(?,?,?,?,?,?,?)'
    let params = [args.workshopId, args.groupId, args.date, args.status, args.inspectNum, args.checkpointNum, args.times]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
}