import { getDb } from '$lib/db.js'

export async function GET() {
  const db = await getDb()
  const rows = await db.all('SELECT id, name, street, postal_code, city FROM addresses')
  return new Response(JSON.stringify(rows))
}