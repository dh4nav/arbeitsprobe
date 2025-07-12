import { getDb } from '$lib/db.js'

export async function GET() {
  const db = await getDb()
  const rows = await db.all('SELECT id, beschreibung, content FROM texts')
  console.log(rows)
  return new Response(JSON.stringify(rows))
}
