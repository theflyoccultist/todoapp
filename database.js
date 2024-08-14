import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.MYSQl_HOST,
    user: process.env.MYSQl_USER,
    password: process.env.MYSQl_PASSWORD,
    database: process.env.MYSQl_DATABASE
}).promise()

async function getTasks() {
    const [rows] = await pool.query("SELECT * FROM list")
    return rows
}

const tasks = await getTasks()
console.log(tasks)
