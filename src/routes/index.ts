import UsersRoutes from './users.routes';
import BooksRoutes from './books.routes';
import CategoriesRoutes from './categories.routes';
import AuthRoutes from './auth.routes';
import express from 'express';
import config from 'config';

const baseUrl = config.get('service.baseUrl');

export default (app: express.Application): void => {
  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });
  app.get(`${baseUrl}/ping`, (_req, res) => {
    res.send('pong');
  });
  app.use(`${baseUrl}/users`, UsersRoutes());
  app.use(`${baseUrl}/books`, BooksRoutes());
  app.use(`${baseUrl}/categories`, CategoriesRoutes());
  app.use(`${baseUrl}/auth`, AuthRoutes());
};
