import express from 'express';
import { validateRequestData } from 'src/middlewares/validate-request-data.middleware';
import { UsersController } from 'src/modules/users/users.controller';
import { UserSchema } from 'src/modules/users/users.schema';

const router = express.Router();
export default (): any => {
  router.route('/').post([validateRequestData(UserSchema)], UsersController.createUser);
  return router;
};
