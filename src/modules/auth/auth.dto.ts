/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRequest } from 'src/base/request.base';

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export interface LoginRequestDto extends BaseRequest {}
