import express from 'express';
import { AuthService } from './auth.service';

export const AuthController = {
  createJWT: (req: express.Request, res: express.Response) => {
    const data = AuthService.generateJWT(req.body);
    return res.status(200).send(data);
  },
};
