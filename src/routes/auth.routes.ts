import express from 'express';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthMiddleware } from 'src/modules/auth/auth.middleware';

const router = express.Router();
export default (): express.Router => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     LoginRequestDto:
   *       type: object
   *       properties:
   *         email:
   *           type: string
   *           format: email
   *           example: example@gmail.com
   *         password:
   *           type: string
   *           example: 123456
   *     RefreshTokenRequestDto:
   *       type: object
   *       properties:
   *         refreshToken:
   *           type: string
   *   responses:
   *     200LoginSuccess:
   *       description: Login successfully
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               accessToken:
   *                 type: string
   *               refreshToken:
   *                 type: string
   *     200RefreshSuccess:
   *       description: Refresh token successfully
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               accessToken:
   *                 type: string
   *   requestBodies:
   *     LoginRequestBody:
   *       description: Login request body
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequestDto'
   *     RefreshTokenRequestBody:
   *       description: Refresh token request body
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RefreshTokenRequestDto'
   */

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     tags:
   *       - Auth
   *     summary: User login to the web application
   *     description: Authenticate user and return access token and fresh token
   *     operationId: logIn
   *     requestBody:
   *       $ref: '#/components/requestBodies/LoginRequestBody'
   *     responses:
   *       200:
   *         $ref: '#/components/responses/200LoginSuccess'
   */
  router.route('/login').post(AuthController.login);

  /**
   * @swagger
   * /auth/refresh-token:
   *   post:
   *     tags:
   *      - Auth
   *     summary: Regenerate access token
   *     description: Check if refresh token is valid and return new access token
   *     operationId: refreshToken
   *     requestBody:
   *       $ref: '#/components/requestBodies/RefreshTokenRequestBody'
   *     responses:
   *       200:
   *         $ref: '#/components/responses/200RefreshSuccess'
   */
  router
    .route('/refresh')
    .post(
      [AuthMiddleware.verifyRefreshTokenBodyRequest, AuthMiddleware.verifyRefreshToken],
      AuthController.refreshToken,
    );

  return router;
};
