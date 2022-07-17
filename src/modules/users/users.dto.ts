import { BaseRequest } from 'src/base/request.base';

export type UserRequest = BaseRequest;

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
