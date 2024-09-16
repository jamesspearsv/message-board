import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile, readFile } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const Controller = (() => {
  function getNewRoute(req, res) {
    res.render('messages', { title: 'New Message' });
  }

  async function postNewRoute(req, res, next) {
    try {
      const newMessage = {
        user: req.body.user,
        text: req.body.text,
        added: new Date(),
      };

      // Read contents of current messages.json
      const data = await readFile(
        join(__dirname, '/../messages.json'),
        'utf-8'
      );

      // parse contents to json
      const content = JSON.parse(data);

      // add new message
      content.push(newMessage);

      await writeFile(
        join(__dirname, '/../messages.json'),
        JSON.stringify(content)
      );

      res.redirect('/');
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async function getIndexRoute(req, res, next) {
    try {
      const messages = await readFile(
        join(__dirname, '/../messages.json'),
        'utf-8'
      );
      res.render('index', {
        title: 'Message Board',
        messages: JSON.parse(messages),
      });
    } catch (error) {
      next(error);
    }
  }

  return { getNewRoute, postNewRoute, getIndexRoute };
})();

export default Controller;
