const mysqlHelper = require("./mysqlHelper.js")
const config = require('./config.js')

module.exports = {

  async getError(args) {
    let sql = 'SELECT * FROM errordb where checkpointId = ?'
    let params = [args.checkpointId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async fixError(args) {
    let sql = 'INSERT INTO fixdb(inspectId, date, description, photo) VALUE(?,?,?,?)'
    let params = [args.inspectId, args.date, args.description, args.photo]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async delFix(args) {
    let sql = 'DELETE FROM fixdb WHERE inspectId = ?'
    let params = [args.inspectId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async getFix(args) {
    let sql = 'SELECT * FROM fixdb where inspectId = ?'
    let params = [args.inspectId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

}