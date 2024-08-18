import pool from '../config/database.js';

export async function getTasks(userId) {
    const [rows] = await pool.query(`SELECT * FROM list WHERE user_id = ?`, [userId]);
    return rows;
}

export async function getTask(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM list
        WHERE id = ?
        `, [id])
        return rows[0]
    }

export async function createTask(task, status, userId) {
    console.log('creating task with userID:', userId)
    const [result] = await pool.query(`
        INSERT INTO list (task, status, user_id)
        VALUES (?, ?, ?)
        `, [task, status, userId])

        const id = result.insertId;
        return getTask(id);
    }

export async function editTask(id, task, status, userId) {
    const [result] = await pool.query(`
        UPDATE list
        SET task = ?, status = ?
        WHERE id = ? AND user_id = ?
        `, [task, status, id, userId]);

        return result.affectedRows > 0;
    }

export async function deleteTask(id, userId) {
    const [result] = await pool.query(`
        DELETE FROM list
        WHERE id = ? AND user_id = ?
        `, [id, userId])
        return result.affectedRows > 0;
}
