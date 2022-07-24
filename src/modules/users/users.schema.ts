import Joi from 'joi';
import { UserEntity } from './users.interface';

export const UserSchema: Joi.ObjectSchema<UserEntity> = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
