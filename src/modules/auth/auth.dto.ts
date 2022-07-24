/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRequest } from 'src/base/request.base';

export interface AuthRequest extends BaseRequest {
  [key: string]: any;
}

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
