 //server/db/staffdb.js
var mysqlHelper = require("./mysqlHelper.js")

module.exports = {
  async newStaff(args) {
    let sql = 'INSERT INTO staffdb(name,staffId,openId,sex,telNum,avatar) VALUE(?,?,?,?,?,?)'
    let params = [args.name, args.staffId, args.openId, args.sex, args.telNum, args.avatar]
    let result = mysqlHelper.query(sql, params)
    return result
  },
  async modifyUserInfo(args) {
    let sql = 'UPDATE staffdb SET name= ?, staffId= ?, sex= ?, telNum= ?, avatar= ? where openId = ?'
    let params = [args.name, args.staffId, args.sex, args.telNum, args.avatar, args.openId]
    let result = mysqlHelper.query(sql, params)
    return result
  },
  async getStaffByOpenId(args) {
    let sql = 'SELECT * FROM staffdb where openId = ?'
    let params = [args.openId]
    let result = mysqlHelper.query(sql, params)
    return result
  },
}
