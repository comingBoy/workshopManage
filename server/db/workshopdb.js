const mysqlHelper = require("./mysqlHelper.js")

module.exports = {
  //查看部门负责车间
  async getGroupWorkshop(args) {
    let sql = 'SELECT * FROM workshopdb where groupId = ?'
    let params = [args.groupId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //新建车间
  async newWorkshop(args) {
    let sql = 'INSERT INTO workshopdb(workshopName,groupId,checkpointNum,times,openId) VALUE(?,?,?,?,?)'
    let params = [args.workshopName, args.groupId, args.checkpointNum, args.times, args.openId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //删除车间
  async deleteWorkshop(args) {
    let sql = 'DELETE FROM workshopdb where workshopId = ?'
    let params = [args.workshopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //获取车间信息
  async getWorkshopInfo(args) {
    let sql = 'SELECT * FROM workshopdb where workshopId = ?'
    let params = [args.workshopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  async getMyWorkshop(args) {
    let sql = 'SELECT * FROM workshopdb where groupId = ? AND openId = ?'
    let params = [args.groupId, args.openId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
}