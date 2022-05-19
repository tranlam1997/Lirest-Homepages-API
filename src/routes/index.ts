import UsersRoutes from './users.routes';
import BooksRoutes from './books.routes';
import CategoriesRoutes from './categories.routes';
import AuthRoutes from './auth.routes';
import express from 'express';

export default (app: express.Application) => {
  /**
   * @swagger
   * tags:
   * - name: Users
   *   description: User management
   * - name: Books
   *   description: Book management
   * - name: Categories
   *   description: Category management
   * - name: Auth
   *   description: Authentication
   */
  app.use('/users', UsersRoutes());
  app.use('/books', BooksRoutes());
  app.use('/categories', CategoriesRoutes());
  app.use('/auth', AuthRoutes());
};
