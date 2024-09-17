import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import appRouter from './routes/routes.js';

// enable __dirname & __filename in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Init app
const app = express();

// App configurations
const PORT = process.env.PORT || 3000;
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
const assetsPath = join(__dirname, 'public');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

// Init app's router
app.use(appRouter);

// Start app
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
