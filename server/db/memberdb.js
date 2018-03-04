var mysqlHelper = require("./mysqlHelper.js")

module.exports = {
    //加入部门
  async joinGroup(args) {
    let sql = 'INSERT INTO memberdb(groupId,openId,label) VALUE(?,?,?)'
    let params = [args.groupId, args.openId, args.label]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //验证是否加入部门
  async verifyStaff(args) {
    let sql = 'SELECT groupId,openId FROM memberdb where groupId = ? and openId = ?'
    let params = [args.groupId, args.openId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  //获取员工openId
  async getStaff(args) {
    let sql = 'SELECT * FROM memberdb where groupId = ?'
    let params = [args.groupId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
  async delStaff(args){
    let sql = 'DELETE FROM memberdb WHERE openid = ? AND groupId = ?'
    let params = [args.openId,args.groupId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async setLevel(args) {
    let sql = 'UPDATE memberdb SET label = ? where groupId = ? and openId = ?'
    let params = [args.label, args.groupId, args.openId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async getSuperior(args) {
    let sql = 'SELECT * FROM memberdb where groupId = ? and label = 2'
    let params = [args.groupId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async getAdmin(args) {
    let sql = 'SELECT * FROM memberdb where groupId = ? and label = 0'
    let params = [args.groupId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
}