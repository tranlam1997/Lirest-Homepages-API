import express from 'express';
import { BooksController } from 'src/modules/books/books.controller';

const router = express.Router();
export default (): any => {
  router.route('/').post(BooksController.createBook);
  return router;
};
