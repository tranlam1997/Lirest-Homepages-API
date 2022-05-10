import UsersRoutes from './users.routes';
import BooksRoutes from './books.routes';
import CategoriesRoutes from './categories.routes';
import express from 'express';

export default (app: express.Application) => {
  app.use('/users', UsersRoutes());
  app.use('/books', BooksRoutes());
  app.use('/categories', CategoriesRoutes());
};
