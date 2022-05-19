import express from 'express';
import { CategoriesController } from 'src/modules/categories/categories.controller';

const router = express.Router();
export default (): express.Router => {
  router.route('/').post(CategoriesController.createCategory);
  return router;
};
