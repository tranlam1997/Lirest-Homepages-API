import { BaseResponse } from 'src/base/response.base';
import { ILoginRequest, IRefreshTokenRequest } from './auth.interface';
import { AuthService } from './auth.service';

export const AuthController = {
  async login(req: ILoginRequest, res: BaseResponse) {
    const result = await AuthService.login(req.body);
    return res.status(200).send(result);
  },

  async refreshToken(req: IRefreshTokenRequest, res: BaseResponse) {
    const result = await AuthService.refreshToken(req);
    return res.status(200).send(result);
  },
};
