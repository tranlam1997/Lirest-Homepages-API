import { BaseRequest } from 'src/base/request.base';
import { IJwt } from '../auth/auth.interface';

export interface IUserEntity {
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  username: string;
  password: string;
}

export interface ICreateUserRequest extends BaseRequest {
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

export interface IUpdateUserRequest extends BaseRequest {
  body: Partial<{
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
  }>;
}

export interface IGetUserByIdRequest extends BaseRequest {
  params: {
    id: string;
  };
  accessTokenDecoded?: IJwt;
}
