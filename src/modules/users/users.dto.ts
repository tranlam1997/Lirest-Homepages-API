import { BaseRequest } from 'src/base/request.base';
import { Jwt } from '../auth/auth.interface';

export interface UserRequest extends BaseRequest {
  [key: string]: any;
}

export interface CreateUserRequestDto extends UserRequest {
  body: {
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
  };
}

export interface GetUserRequestDto extends UserRequest {
  params: {
    id: string;
  };
  accessTokenDecoded?: Jwt;
}
