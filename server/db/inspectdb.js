//server/db/inspectdb.js
const mysqlHelper = require("./mysqlHelper.js")
const config = require('./config.js')

module.exports = {
  async getInspect(args) {
    let sql = 'SELECT * FROM inspectdb where workshopId = ? and date REGEXP ?'
    let params = [args.workshopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async getInspect0(args) {
    let sql = 'SELECT * FROM inspectdb where inspectId = ?'
    let params = [args.inspectId]
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
    let sql = 'SELECT * FROM inspectdb where timesId = ?'
    let params = [args.timesId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //查看检查点状态
  async getError(args) {
    let sql = 'SELECT date, error FROM inspectdb where workshopId = ? and date REGEXP ?'
    let params = [args.workshopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  //检查
  async inspect(args) {
    let sql = 'INSERT INTO inspectdb(date, workshopId, checkpointId, timesId, checkpointName, error, admin, description, photo, openId) VALUE(?,?,?,?,?,?,?,?,?,?)'
    let params = [args.date, args.workshopId, args.checkpointId, args.timesId, args.checkpointName, args.error, args.admin, args.description, args.photo, args.openId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  //删除检查
  async delInspect(args) {
    let sql = 'DELETE FROM inspectdb WHERE checkpointId = ? AND date = ?'
    let params = [args.checkpointId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  }
}

