import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile, readFile } from 'node:fs/promises';
import Queries from '../db/queries.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const Controller = (() => {
  function newMessageGet(req, res) {
    res.render('messages', { title: 'New Message' });
  }

  async function newMessagePost(req, res, next) {
    try {
      const newMessage = {
        username: req.body.user,
        content: req.body.text,
        added: new Date(),
      };

      await Queries.insertMessage(newMessage);

      res.redirect('/');
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async function indexGet(req, res, next) {
    try {
      const rows = await Queries.getMessages();

      res.render('index', {
        title: 'Message Board',
        messages: rows,
      });
    } catch (error) {
      next(error);
    }
  }

  return { indexGet, newMessageGet, newMessagePost };
})();

export default Controller;
