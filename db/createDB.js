import pg from 'pg';
import dotenv from 'dotenv';

// import .env file
dotenv.config();

async function main() {
  const SQL = `
    CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 255 ),
    content TEXT,
    added DATE
    );`;

  const client = new pg.Client();

  console.log('>>> connecting to db...');
  await client.connect();
  console.log('>>> creating table...');
  await client.query(SQL);
  await client.end();
  console.log('>>> done\n');
}

export default main;
