/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRequest } from 'src/base/request.base';

export interface AuthRequest extends BaseRequest {}

export interface RefreshTokenRequestDto extends AuthRequest {
  body: {
    refreshToken: string;
  };
}

export interface LoginRequestDto extends AuthRequest {
  body: {
    email: string;
    password: string;
  };
}

export interface VerifyAuthRequestDto extends AuthRequest {
  accessTokenDecoded: {
    userId: string;
    email: string;
  };
}
