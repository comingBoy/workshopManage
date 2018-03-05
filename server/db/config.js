const production = {

  //MYSQL数据库配置
  
  MYSQL: {
    host: "172.16.155.63",
    user: "root",
    password: "UGW5Kwjl36540",
    port: "3306",
    database: "cAuth",
    supportBigNumbers: true,
    multipleStatements: true,
    timezone: 'utc'
  }

}

//开发配置
const development = {


  //MYSQL数据库配置
  mysql: {
    host: "localhost",
    user: "root",
    password: "wx66ef76a4eeb051e3",
    port: "3306",
    database: "workshopManage",
    charset: 'utf8mb4',
  }

}

//生产配置
const product = {


  //MYSQL数据库配置
  mysql: {
    host: "172.16.164.124",
    user: "root",
    password: "li0DllWC33890",
    port: "3306",
    database: "workshopManage",
    charset: 'utf8mb4',
  }

}

const config = product

module.exports = config