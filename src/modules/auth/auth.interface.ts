import { BaseRequest } from 'src/base/request.base';
import { RefreshToken } from './auth.entity';

export type IJwt = {
  userId: string;
  username: string;
  refreshTokenExpiresIn: number;
};

export interface ILoginRequest extends BaseRequest {
  body: {
    email: string;
    password: string;
  };
}

export interface ILoginBodyRequest {
  email: string;
  password: string;
}

export interface IRefreshTokenRequest extends BaseRequest {
  body: {
    refreshToken: string;
  };
  decodedRefreshToken: IJwt;
  refreshTokenInfo: RefreshToken;
}
