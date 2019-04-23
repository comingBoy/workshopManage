var mysqlHelper = require("./mysqlHelper.js")

const config = require('./config.js')

module.exports = {

  async getMessage(args) {
    let sql = 'select * from messagedb where groupId = ? and staffId = ?'
    let params = [args.groupId, args.staffId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async leaveMessage(args) {
    let sql = 'INSERT INTO messagedb(date, groupId, superiorId, staffId, ifRead, message) VALUE(?,?,?,?,?,?)'
    let params = [args.date, args.groupId, args.superiorId, args.staffId, args.ifRead, args.message]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async readMessage(args) {
    let sql = 'UPDATE messagedb SET ifRead= 1 where groupId = ? and superiorId = ? and staffId= ?'
    let params = [args.groupId, args.superiorId, args.staffId]
    let result = mysqlHelper.query(sql, params)
    return result
  },
}