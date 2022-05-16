import express from 'express';
import { validateRequestData } from 'src/middlewares/validate-request-data.middleware';
import { UsersController } from 'src/modules/users/users.controller';
import { UserSchema } from 'src/modules/users/users.schema';
import { UsersMiddleware } from 'src/modules/users/users.middleware';

const router = express.Router();
export default () => {
  router
    .route('/')
    .post(
      [validateRequestData(UserSchema), UsersMiddleware.checkUserExists],
      UsersController.createUser,
    );
  return router;
};
