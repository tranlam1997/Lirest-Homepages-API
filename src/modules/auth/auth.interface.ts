import { BaseRequest } from 'src/base/request.base';

export type Jwt = {
  userId: string;
  email: string;
};

export interface VerifyAuthRequest extends BaseRequest {
  accessTokenDecoded: Jwt;
}
