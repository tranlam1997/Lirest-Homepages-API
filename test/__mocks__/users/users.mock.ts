import { faker } from '@faker-js/faker';
import { User } from '@src/modules/users/users.entity';
import { ICreateUserRequest } from '@src/modules/users/users.interface';

export const CreateUserRequestStub = () => {
  return {
    body: {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      dateOfBirth: faker.date.past(),
      phoneNumber: faker.phone.number(),
      email: faker.datatype.uuid(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    },
  } as ICreateUserRequest;
};

export const UserEntityStub = (id = faker.datatype.uuid()) => {
  return {
    id,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    dateOfBirth: faker.date.past(),
    phoneNumber: faker.phone.number(),
    email: faker.datatype.uuid(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  } as User;
};
