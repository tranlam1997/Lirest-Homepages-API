import { BaseResponse } from 'src/base/response.base';

export type Jwt = {
  refreshKey: string;
  userId: string;
};

export interface VerifyAuthResponse extends BaseResponse {
  decoded: Jwt;
}
