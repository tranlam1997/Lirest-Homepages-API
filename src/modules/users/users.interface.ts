import { BaseRequest } from '../../base/request.base';

export interface UserEntity {
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  username: string;
  password: string;
}
