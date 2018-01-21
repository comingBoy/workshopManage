const mysqlHelper = require("./mysqlHelper.js")
const config = require('./config.js')

module.exports = {

  async getError() {
    let sql = 'SELECT * FROM errordb where checkpointId = ?'
    let params = [args.checkpointId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async fixError() {
    let sql = 'INSERT INTO fixdb(inspectId, date, describtion, photo) VALUE(?,?,?,?)'
    let params = [args.inspectId, args.date, args.describtion, args.photo]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async delFix() {
    let sql = 'DELETE FROM fixdb WHERE inspectId = ?'
    let params = [args.inspectId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async getFix() {
    let sql = 'SELECT * FROM errordb where inspectId = ?'
    let params = [args.inspectId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

}