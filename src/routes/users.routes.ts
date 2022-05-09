import express from 'express';
import { UsersController } from 'src/modules/users/users.controller';

const router = express.Router();
export default () => {
  router.route('/users').post(UsersController.createUser);
};
