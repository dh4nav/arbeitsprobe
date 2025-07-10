import { getDb } from '$lib/db.js'

export async function GET() {
  const db = await getDb()
  const rows = await db.all('SELECT name FROM countries')
  return new Response(JSON.stringify(rows.map((r) => r.name)))
}
