import e from 'express';
import pool from './pool.cjs';

const Queries = (() => {
  // write queries here
  async function getMessages() {
    const { rows } = await pool.query('SELECT * FROM messages');
    console.log(rows);
    return rows;
  }

  async function insertMessage(message) {
    const SQL = `INSERT INTO messages (username, content, added) 
    VALUES($1, $2, $3)`;
    const values = [message.username, message.content, message.added];

    try {
      await pool.query(SQL, values);
      return 1;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  return { getMessages, insertMessage };
})();

export default Queries;
