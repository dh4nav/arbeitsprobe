import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db

// Lazily open the database once
export async function getDb() {
  if (!db) {
    db = await open({
      filename: './my-database.sqlite',
      driver: sqlite3.Database
    })
  }
  return db
}

// Select all users
export async function getUsers() {
  const db = await getDb()
  return db.all('SELECT id, name FROM users')
}

// Insert a user
export async function addUser(name) {
  const db = await getDb()
  await db.run('INSERT INTO users (name) VALUES (?)', name)
}

// Update a user
export async function updateUser(id, name) {
  const db = await getDb()
  await db.run('UPDATE users SET name = ? WHERE id = ?', name, id)
}

// Delete a user
export async function deleteUser(id) {
  const db = await getDb()
  await db.run('DELETE FROM users WHERE id = ?', id)
}
