import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQl_HOST,
    user: process.env.MYSQl_USER,
    password: process.env.MYSQl_PASSWORD,
    database: process.env.MYSQl_DATABASE
}).promise()

export async function getTasks() {
    const [rows] = await pool.query("SELECT * FROM list")
    return rows
}


export async function getTask(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM list
        WHERE id = ?
        `, [id])
        return rows[0]
    }

export async function createTask(task, status) {
    const [result] = await pool.query(`
        INSERT INTO list (task, status)
        VALUES (?, ?)
        `, [task, status])
        const id = result.insertId
        return getTask(id)
    }

export async function editTask(id, task, status) {
    const [result] = await pool.query(`
        UPDATE list
        SET task = ?, status = ?
        WHERE id = ?
        `, [task, status, id]);

        return result.affectedRows > 0;
    }

export async function deleteTask(id) {
    const [result] = await pool.query(`
        DELETE FROM list
        WHERE id = ?
        `, [id])
        return result.affectedRows > 0;
}

export async function deleteAllTasks() {
    const [result] = await pool.query(`
        DELETE FROM list
    `);
    return result.affectedRows > 0;
}