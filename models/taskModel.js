import pool from '../config/database.js';

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
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();
        await connection.query(`
            DELETE FROM list
        `);

        await connection.query(`
            ALTER TABLE list AUTO_INCREMENT = 1;
        `);
        
        await connection.commit();
        return true;
    } catch(error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}