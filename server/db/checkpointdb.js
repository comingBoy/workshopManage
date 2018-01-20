//server/db/checkpointdb.js
const mysqlHelper = require("./mysqlHelper.js")
const config = require('./config.js')


module.exports = {
  //查看车间检查点信息
  async getCheckpointInfo(args) {
    let sql = 'SELECT * FROM checkpointdb where workshopId = ?'
    let params = [args.workshopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //查看车间检查点
  async getCheckpoint(args) {
    let sql = 'SELECT * FROM checkpointdb where workshopId = ?'
    let params = [args.workshopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //新建检查点
  async newCheckpoint(args) {
    let sql = 'INSERT INTO checkpointdb(name, workshopId) VALUE (?,?)'
    let params = [args.name,args.workshopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //删除车间所有检查点
  async delAllCheckpoint(args) {
    let sql = 'DELETE FROM checkpointdb where workshopId = ?'
    let params = [args.workshopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  }
}
