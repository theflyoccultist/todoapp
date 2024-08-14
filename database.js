import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'brat',
    database: 'todolist'
}).promise()

const result = await pool.query("SELECT * FROM list")
console.log(result)