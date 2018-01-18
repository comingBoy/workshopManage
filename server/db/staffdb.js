 //server/db/staffdb.js
var mysqlHelper = require("./mysqlHelper.js")

module.exports = {
  async newStaff(args) {
    let sql = 'INSERT INTO staffdb(name,staffId,openId,sex,telNumber,avatar) VALUE(?,?,?,?,?,?)'
    let params = [args.name, args.staffId, args.openId, args.sex, args.telNumber, args.avatar]
    let result = mysqlHelper.query(sql, params)
    return result
  },
  async modifyUserInfo(args) {
    console.log(args)
    let sql = 'UPDATE staffdb SET name= ?, staffId= ?, sex= ?, telNumber= ?, avatar= ? where openId = ?'
    let params = [args.name, args.staffId, args.sex, args.telNumber, args.avatar, args.openId]
    let result = mysqlHelper.query(sql, params)
    console.log(result)
    return result
  },
  async getStaffByOpenId(args) {
    let sql = 'SELECT name,staffId,sex,telNumber,openId,avatar FROM staffdb where openId = ?'
    let params = [args.openId]
    let result = mysqlHelper.query(sql, params)
    return result
  },
}
