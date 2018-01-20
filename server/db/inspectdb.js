//server/db/inspectdb.js
const mysqlHelper = require("./mysqlHelper.js")
const config = require('./config.js')
//查询检查情况(模糊)
module.exports = {
  async getInspect(args) {
    let sql = 'SELECT * FROM inspectdb where workshopId = ? and date REGEXP ?'
    let params = [args.workshopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //更新检查点是否检查状态
  async refreshStatus(args) {
    let sql = 'UPDATE checkpointdb SET status = ? where inspectId = ?'
    let params = [args.status, args.inspectId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //查看检查历史
  async getInspectHis(args) {
    let sql = 'SELECT * FROM inspectdb where workshopStatusId = ? and workshopId = ?'
    let params = [args.workshopStatusId, args.workshopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //查看检查点状态
  async getError(args) {
    let sql = 'SELECT date, error FROM inspectdb where workshopId = ? and date REGEXP ?'
    let params = [args.workshopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  }
}

