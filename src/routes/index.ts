import UsersRoutes from './users.routes';
import BooksRoutes from './books.routes';
import CategoriesRoutes from './categories.routes';
import AuthRoutes from './auth.routes';
import express from 'express';
import config from 'config';
import { openAPISpecification, swaggerUIOptions } from '@src/common/swagger/swagger-config';
import swaggerUI from 'swagger-ui-express';
import basicAuth from '../middlewares/basic-auth.middleware';
import { SecurityHandlerMiddleware } from '../middlewares/security-handler.middleware';
import { ErrorHandlerMiddlewares } from '../middlewares/errors-handler.middware';
import { UtilityHandlerMiddlewares } from '../middlewares/utility-handler.middleware';

const baseUrl = config.get('service.baseUrl');

export default (app: express.Application): void => {
  app.use(UtilityHandlerMiddlewares);
  app.use(SecurityHandlerMiddleware);
  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });
  app.get(`${baseUrl}/ping`, (_req, res) => {
    res.send('pong');
  });
  app.use('/api-docs', swaggerUI.serve, [
    basicAuth,
    swaggerUI.setup(openAPISpecification, swaggerUIOptions),
  ]);
  app.use(`${baseUrl}/users`, UsersRoutes());
  app.use(`${baseUrl}/books`, BooksRoutes());
  app.use(`${baseUrl}/categories`, CategoriesRoutes());
  app.use(`${baseUrl}/auth`, AuthRoutes());
  app.use(ErrorHandlerMiddlewares);
};
