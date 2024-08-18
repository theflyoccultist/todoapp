import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(`
        INSERT INTO users (username, password)
        vALUES (?, ?)
        `, [username, hashedPassword]);

        const userId = result.insertId;

        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [userId]);
        return rows[0];
}

export async function findOne(username) {
    const [rows] = await pool.query(`
        SELECT * FROM users
        WHERE username = ?
        `, [username]);

        return rows[0];
}

export async function findById(id) {
    const [rows] = await pool.query(`
        SELECT * FROM users
        WHERE id = ?
        `, [id]);
        
        return rows[0];
}