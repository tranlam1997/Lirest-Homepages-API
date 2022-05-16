import express from 'express';
import { RefreshTokenRequest } from './auth.interface';
import { AuthService } from './auth.service';

export const AuthController = {
  async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    const data = await AuthService.login(req.body).catch((error) => next(error));
    return res.status(200).send(data);
  },

  async refreshToken(req: RefreshTokenRequest, res: express.Response, next: express.NextFunction) {
    const data = AuthService.refreshToken(req.accessTokenDecoded);
    return res.status(200).send(data);
  },
};
