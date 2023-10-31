import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: 'monorail.proxy.rlwy.net',
  user: 'root',
  password: 'hg2FF6h33h3AF5fd4gEdFheF4AFgcd4g',
  database: 'railway'
}).promise()

export async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes")
    return rows
}

export async function getNote(id) {
    const [rows] = await pool.query(`
      SELECT *
      FROM notes
      WHERE id = ?
      `, [id])
    return rows[0]
}

export async function createNote(title, content) {
  const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, content])
    const id = result.insertId
    return getNote(id)
}
