import express from 'express';
import { AuthController } from '@src/modules/auth/auth.controller';
import { AuthMiddleware } from '@src/modules/auth/auth.middleware';
import { asyncHandler } from '@src/shared/helper';

const router = express.Router();
export default (): express.Router => {
  router.route('/login').post(asyncHandler(AuthController.login));

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
