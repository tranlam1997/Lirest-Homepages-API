import express from 'express';
import { BooksController } from '@src/modules/books/books.controller';

const router = express.Router();
export default (): express.Router => {
  router.route('/').post(BooksController.createBook);
  return router;
};
