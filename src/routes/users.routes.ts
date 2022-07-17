import express from 'express';
import { validateRequestData } from 'src/middlewares/validate-request-data.middleware';
import { UsersController } from 'src/modules/users/users.controller';
import { UserSchema } from 'src/modules/users/users.schema';
import { UsersMiddleware } from 'src/modules/users/users.middleware';

const router = express.Router();
export default (): express.Router => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     UserRequestDto:
   *       type: object
   *       properties:
   *         firstname:
   *           type: string
   *           example: John
   *         lastname:
   *           type: string
   *           example: Doe
   *         dateOfBirth:
   *           type: string
   *           format: date
   *           example: 2020-01-01
   *         phoneNumber:
   *           type: string
   *           example: 02398349845
   *         email:
   *           type: string
   *           format: email
   *           example: example @gmail.com
   *         username:
   *           type: string
   *           example: john.doe
   *         password:
   *           type: string
   *           example: 123456
   *   requestBodies:
   *     CreateUserRequestBody:
   *       description: Create user request body
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserRequestDto'
   *   responses:
   *     200CreateUserSuccess:
   *       description: Create user successfully
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: string
   */

  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *       - User
   *     description: Create new user if not exists
   *     summary: Create new user
   *     requestBody:
   *       $ref: '#/components/requestBodies/CreateUserRequestBody'
   *     responses:
   *       200:
   *         $ref: '#/components/responses/200CreateUserSuccess'
   */

  router
    .route('/')
    .post(
      [validateRequestData(UserSchema), UsersMiddleware.checkUserExists],
      UsersController.createUser,
    );
  return router;
};
