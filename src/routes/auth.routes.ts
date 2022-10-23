import express from 'express';
import { AuthController } from '@src/modules/auth/auth.controller';
import { AuthMiddleware } from '@src/modules/auth/auth.middleware';
import { asyncHandler } from '@src/shared/helper';
import { UsersMiddleware } from '@src/modules/users/users.middleware';
import { validateRequestData } from '@src/middlewares/request-validator.middleware';
import { UserSchema } from '@src/modules/users/users.schema';

const router = express.Router();
export default (): express.Router => {
  router.route('/login').post(asyncHandler(AuthController.login));
  router
    .route('/signup')
    .post(
      [validateRequestData(UserSchema), UsersMiddleware.checkIfUserAlreadyExists],
      asyncHandler(AuthController.signup),
    );
  router
    .route('/refresh-token')
    .post(
      asyncHandler(
        [
          AuthMiddleware.verifyRefreshTokenBodyRequest,
          AuthMiddleware.checkIfInvalidRefreshToken,
          AuthMiddleware.verifyValidRefreshToken,
        ],
        AuthController.refreshToken,
      ),
    );

  return router;
};
