import UsersRoutes from './users.routes';
import BooksRoutes from './books.routes';
import CategoriesRoutes from './categories.routes';
import AuthRoutes from './auth.routes';
import express from 'express';

export default (app: express.Application): void => {
  app.use('/users', UsersRoutes());
  app.use('/books', BooksRoutes());
  app.use('/categories', CategoriesRoutes());
  app.use('/auth', AuthRoutes());
};
