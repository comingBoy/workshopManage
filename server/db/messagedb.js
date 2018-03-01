var mysqlHelper = require("./mysqlHelper.js")

const config = require('./config.js')

module.exports = {

  async getMessage(args) {
    let sql = 'SELECT * FROM messagedb where groupId = ? and staffId = ?'
    let params = [args.groupId, args.openId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
}