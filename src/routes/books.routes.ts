import express from 'express';
import { BooksController } from 'src/modules/books/books.controller';

export default (app: express.Application) => {
  app.route('/book').post(BooksController.createBook);
};
