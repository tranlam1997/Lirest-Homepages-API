import express from 'express';
import { BaseResponse } from 'src/base/response.base';
import { LoginRequestDto, RefreshTokenRequestDto } from './auth.dto';
import { AuthService } from './auth.service';

export const AuthController = {
  async login(req: LoginRequestDto, res: BaseResponse, _next: express.NextFunction) {
    const data = await AuthService.login(req.body);
    return res.status(200).send(data);
  },

  async refreshToken(req: RefreshTokenRequestDto, res: BaseResponse, _next: express.NextFunction) {
    const data = AuthService.refreshToken(req.body);
    return res.status(200).send(data);
  },
};
