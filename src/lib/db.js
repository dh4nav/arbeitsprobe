import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db

// Lazily open the database once
export async function getDb() {
  if (!db) {
    db = await open({
      filename: './content.db',
      driver: sqlite3.Database
    })
  }
  return db
}

// Select all users
export async function getAddresses() {
  const db = await getDb()
  return db.all('SELECT id, name, city, street, postal_code FROM addresses')
}

// Insert a user
export async function addAddresses(name, city, street, postal_code) {
  const db = await getDb()
  await db.run(
    'INSERT INTO addresses (name, city, street, postal_code) VALUES (?, ?, ?, ?)',
    name,
    city,
    street,
    postal_code
  )
}

// Update a user
export async function updateAddresses(id, name, city, street, postal_code) {
  const db = await getDb()
  await db.run(
    'UPDATE addresses SET name = ?, city = ?, street = ?, postal_code = ? WHERE id = ?',
    name,
    city,
    street,
    postal_code,
    id
  )
}

// Delete a user
export async function deleteAddresses(id) {
  const db = await getDb()
  await db.run('DELETE FROM addresses WHERE id = ?', id)
}

// Select all users
export async function getText() {
  const db = await getDb()
  return db.all('SELECT id, beschreibung, content FROM texts')
}

// Insert a user
export async function addText(beschreibung, content) {
  const db = await getDb()
  await db.run(
    'INSERT INTO addresses (beschreibung, content) VALUES (?, ?)',
    beschreibung, content
  )
}

// Update a user
export async function updateText(id, beschreibung, content) {
  const db = await getDb()
  await db.run(
    'UPDATE addresses SET beschreibung = ?, content = ? WHERE id = ?',
    beschreibung,
    content,
    id
  )
}

// Delete a user
export async function deleteText(id) {
  const db = await getDb()
  await db.run('DELETE FROM addresses WHERE id = ?', id)
}