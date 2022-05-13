import express from 'express';
import { AuthController } from 'src/modules/auth/auth.controller';

const router = express.Router();
export default () => {
  router.route('/').post(AuthController.createJWT);
  return router;
};
