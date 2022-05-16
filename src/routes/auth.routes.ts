import express from 'express';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthMiddleware } from 'src/modules/auth/auth.middleware';

const router = express.Router();
export default () => {
  router.route('/login').post(AuthController.login);
  router
    .route('/refresh')
    .post(
      [
        AuthMiddleware.verifyAuth,
        AuthMiddleware.verifyBodyRequest,
        AuthMiddleware.verifyRefreshToken,
      ],
      AuthController.refreshToken,
    );
  return router;
};
