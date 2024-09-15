import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { name } from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Init app
const app = express();

// App configuration
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
const assetsPath = join(__dirname, 'public');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

// Add route
app.get('/new', (req, res) => {
  res.render('messages', { title: 'New Message' });
});

app.post('/new', async (req, res, next) => {
  console.log(req.body);
  try {
    const newMessage = {
      user: req.body.user,
      text: req.body.text,
      added: new Date(),
    };

    console.log(newMessage);

    // Read contents of current messages.json
    const data = await readFile(join(__dirname, '/messages.json'), 'utf-8');

    // parse contents to json
    const content = JSON.parse(data);

    // add new message
    content.push(newMessage);

    await writeFile(join(__dirname, '/messages.json'), JSON.stringify(content));

    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Index route
app.get('/', async (req, res, next) => {
  try {
    const messages = await readFile(join(__dirname, '/messages.json'), 'utf-8');
    res.render('index', {
      title: 'Message Board',
      messages: JSON.parse(messages),
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

// Start app
app.listen(PORT, HOST, () =>
  console.log(`Server started on http://${HOST}:${PORT}`)
);
