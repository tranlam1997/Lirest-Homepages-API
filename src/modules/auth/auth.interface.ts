import { BaseRequest } from 'src/base/request.base';

export type AccessToken = {
  refreshKey: string;
  userId: string;
  email: string;
};

export type RefreshToken = {
  secretCode: string;
};

export interface VerifyAuthRequest extends BaseRequest {
  accessTokenDecoded: AccessToken;
}

export type RefreshTokenRequest = VerifyAuthRequest;
