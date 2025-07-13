import { json } from '@sveltejs/kit';
// import { SqlDatabase } from 'langchain/sql_db';
// import { Ollama } from '@langchain/community/llms/ollama';
// import { SqlToolkit } from 'langchain/agents/toolkits/sql';
// import { initializeAgentExecutorWithOptions } from 'langchain/agents';
// import { SqliteDatabase } from '@langchain/community/sql_db/sqlite';
import ollama from 'ollama'
export async function POST({ request }) {
    const rrequest = await request.json()
console.log(rrequest)

  try {

    const ollamaresponse = await ollama.generate({
  model: 'llama3',
  prompt: "Du bist eine sekretärin, die nach dem nachfolgenden auftrag einen brief schreiben soll. Der brief soll in deutsch sein (außer im auftrag ausdrücklich anders gewünscht), und sachlich und höflich sein. Füge keinen sonstigen text hinzu, deine antwort soll ausschließlich der text des briefes sein. Der Auftrag: " + rrequest.query,
})
console.log(ollamaresponse)
 return new Response(JSON.stringify(ollamaresponse), { status: 200 });
  } catch (err) {
    console.error('💥 /api/llms error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
