import { Router } from 'express';
import Controller from '../controllers/controller.js';

const appRouter = Router();

// Add routes
appRouter.get('/new', Controller.newMessageGet);
appRouter.post('/new', Controller.newMessagePost);

// Index route
appRouter.get('/', Controller.indexGet);

appRouter.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

export default appRouter;
