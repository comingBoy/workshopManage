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
  //查看车间检查状态
  async getTimes0(args) {
    let sql = 'SELECT * FROM timesdb where workshopId = ? and date = ?'
    let params = [args.workshopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //增加检查轮数
  async newTimes(args) {
    let sql = 'INSERT INTO timesdb(workshopId, date) VALUE(?,?)'
    let params = [args.workshopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  //删除轮数
  async delTimes(args) {
    let sql = 'DELETE FROM timesdb WHERE workshopId = ? AND date = ?'
    let params = [args.workshopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  }
}