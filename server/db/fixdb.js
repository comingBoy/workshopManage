const mysqlHelper = require("./mysqlHelper.js")
const config = require('./config.js')

module.exports = {

  async getError() {
    let sql = 'SELECT * FROM errordb where checkpointId = ?'
    let params = [args.checkpointId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
}