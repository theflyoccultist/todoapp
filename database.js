import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

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


async function getTask(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM list
        WHERE id = ?
        `, [id])
        return rows[0]
    }

async function createTask(task, status) {
    const result = await pool.query(`
        INSERT INTO list (task, status)
        VALUES (?, ?)
        `, [task, status])
        return result
    }

    const result = await createTask('cook', '0')
    console.log(result)