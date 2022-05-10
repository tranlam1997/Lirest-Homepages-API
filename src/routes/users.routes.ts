import express from 'express';
import { UsersController } from 'src/modules/users/users.controller';

const router = express.Router();
export default (): any => {
  router.route('/').post(UsersController.createUser);
  return router;
};
