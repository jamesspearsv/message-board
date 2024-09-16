import { Router } from 'express';
import Controller from '../controllers/controller.js';

const appRouter = Router();

// Add routes
appRouter.get('/new', Controller.getNewRoute);
appRouter.post('/new', Controller.postNewRoute);

// Index route
appRouter.get('/', Controller.getIndexRoute);

appRouter.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

export default appRouter;
