import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQl_HOST,
    user: process.env.MYSQl_USER,
    password: process.env.MYSQl_PASSWORD,
    database: process.env.MYSQl_DATABASE,
    port: process.env.MYSQl_PORT
}).promise()

export default pool