const mysql=require('mysql')
var pool=mysql.createConnection({
  host:'localhost',
  port:3306,
  user:'root',
  password:'744826786',
  database:'quickcom',
  multipleStatements:true,
  })

  module.exports=pool