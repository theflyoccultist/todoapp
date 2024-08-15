import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(`
        INSERT INTO users (username, password)
        vALUES (?, ?)
        `, [username, hashedPassword]);

        return result.insertId;
}

export async function findUserByUsername(username) {
    const [rows] = await pool.query(`
        SELECT * FROM users
        WHERE username = ?
        `, [username]);

        return rows[0];
}