/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRequest } from 'src/base/request.base';

export interface AuthRequest extends BaseRequest {}

export interface RefreshTokenRequestDto extends AuthRequest {
  refreshToken: string;
}

export interface LoginRequestDto extends AuthRequest {}
