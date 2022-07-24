import { Router } from 'express';
import { validateRequestData } from 'src/middlewares/request-validator.middleware';
import { UsersController } from 'src/modules/users/users.controller';
import { UserSchema } from 'src/modules/users/users.schema';
import { UsersMiddleware } from 'src/modules/users/users.middleware';
import { AuthMiddleware } from 'src/modules/auth/auth.middleware';
import { asyncHandler } from 'src/shared/helper';

const router = Router();
export default (): Router => {
  router
    .route('/')
    .post(
      asyncHandler(
        [validateRequestData(UserSchema), UsersMiddleware.checkIfUserAlreadyExists],
        UsersController.createUser,
      ),
    );

  router
    .route('/:id')
    .get(
      asyncHandler(
        [AuthMiddleware.verifyAuth, UsersMiddleware.checkIfUserExists],
        UsersController.getUser,
      ),
    );

  return router;
};
