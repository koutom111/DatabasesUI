const mysql = require('mysql2');

/* create connection and export it */
const pool = mysql.createPool({
   // host: process.env.DB_HOST,
    host: 'localhost',
    //port: process.env.DB_PORT,
    port: 3306,
    user: 'root',
    password: 'DespoinaTomkou2903!!',
    database:'database'
    //user: process.env.DB_USER,
   // password: process.env.DB_PASS,
    //database: process.env.DB,
})

pool.query("select * from Program", (err,res)=>{
return console.log(res)
})

module.exports = { pool };