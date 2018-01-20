const mysqlHelper = require("./mysqlHelper.js")
const config = require('./config.js')

module.exports = {
  //查看车间检查状态
  async getTimes(args) {
    let sql = 'SELECT * FROM timesdb where workshopId = ? and date REGEXP ?'
    let params = [args.workshopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //新建车间状态
  async newTimes(args) {
    let sql = 'INSERT INTO timesdb(workshopId,groupId,date,status,inspectNum,checkpointNum,times) VALUE(?,?,?,?,?,?,?)'
    let params = [args.workshopId, args.groupId, args.date, args.status, args.inspectNum, args.checkpointNum, args.times]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
}