import express from 'express';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthMiddleware } from 'src/modules/auth/auth.middleware';
import { asyncHandler } from 'src/shared/helper';

const router = express.Router();
export default (): express.Router => {
  router.route('/login').post(asyncHandler(AuthController.login));

  router
    .route('/refresh')
    .post(
      asyncHandler(
        [AuthMiddleware.verifyRefreshTokenBodyRequest, AuthMiddleware.verifyRefreshToken],
        AuthController.refreshToken,
      ),
    );

  return router;
};
