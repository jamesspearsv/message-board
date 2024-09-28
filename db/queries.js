import main from './createDB.js';
import pool from './pool.cjs';

const Queries = (() => {
  async function getMessages() {
    try {
      const { rows } = await pool.query('SELECT * FROM messages');
      return rows;
    } catch (error) {
      console.log('>>> Neet to apply migrations...\n');
      await main();
      return 0;
    }
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
