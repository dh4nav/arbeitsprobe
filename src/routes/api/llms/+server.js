import { json } from '@sveltejs/kit';
import { SqlDatabase } from 'langchain/sql_db';
import sqlite3 from 'sqlite3';
import { Ollama } from 'langchain/llms/ollama';
import { SqlToolkit } from 'langchain/agents/toolkits/sql';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';

export async function POST({ request }) {
  const { query } = await request.json();

  const dbPath = './content.db';
  const sqlite = new sqlite3.Database(dbPath);
  const db = await SqlDatabase.fromExistingConnection(sqlite);

  const llm = new Ollama({
    baseUrl: 'http://localhost:11434',
    model: 'llama3', // or 'mistral', etc.
    temperature: 0
  });

  const toolkit = new SqlToolkit(db, llm);
  const agent = await initializeAgentExecutorWithOptions(toolkit.tools, llm, {
    agentType: 'zero-shot-react-description',
    verbose: false
  });

  const prompt = `
    Du bist eine Sekretärin. Bitte formuliere einen Brief mit folgendem Inhalt:  '${query}'.
    Für das Adressfeld füge bitte den Platzhalter $$ADRESSE$$ ein, und für den namen den Platzhalter $$NAME$$.
    Der Brief soll sachlich und ernst sein, und keinesfalls halluzinationen enthalten. Wenn Du dir nicht sicher bist, dann lass Dinge weg.
  `;

  const response = await agent.run(prompt);

  const [address, text] = response.split('---TEXT---');

  return json({
    text: response 
  });
}
