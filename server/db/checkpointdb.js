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
    let sql = 'INSERT INTO checkpointdb(name, workshopId, times) VALUE (?,?,?)'
    let params = [args.checkpointName, args.workshopId, args.times]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //删除车间所有检查点
  async delAllCheckpoint(args) {
    let sql = 'DELETE FROM checkpointdb where workshopId = ?'
    let params = [args.workshopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async delCheckpoint(args) {
    let sql = 'DELETE FROM checkpointdb where checkpointId = ?'
    let params = [args.checkpointId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

    async changeCheckpointInfo(args) {
    let sql = 'UPDATE checkpointdb SET name = ?, times = ? where checkpointId = ?'
    let params = [args.checkpointName, args.times, args.checkpointId]
    let result = mysqlHelper.query(sql, params)
    console.log(result)
    return result
  },
}


