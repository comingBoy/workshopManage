// server/db/groupdb
//查看所有部门
var mysqlHelper = require("./mysqlHelper.js")

module.exports = {

  async getAllGroup(args) {
    let sql = 'SELECT * FROM groupdb'
    let params = []
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  
  async newGroup(args) {
    let sql = 'INSERT INTO groupdb(groupName,groupCode,groupCover) VALUE(?,?,?)'
    let params = [args.groupName, args.groupCode, args.groupCover]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  //获取部门码
  async getGroupCode(args) {
    let sql = 'SELECT groupCode FROM groupdb where groupId = ?'
    let params = [args.groupId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async delGroup(args) {
    let sql = 'DELETE FROM groupdb WHERE groupId = ?'
    let params = [args.groupId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async modifyGroup(args) {
    let sql = 'UPDATE groupdb SET groupName = ?, groupCover = ?, groupCode = ? where groupId = ?'
    let params = [args.groupName, args.groupCover, args.groupCode, args.groupId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async getLastGroup(args) {
    let sql = 'SELECT * FROM groupdb where groupId in(select max(groupId) from groupdb)'
    let params = []
    let result = await mysqlHelper.query(sql, params)
    return result
  },

}
