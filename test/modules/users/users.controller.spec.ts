import { faker } from '@faker-js/faker';
import { UsersController } from '@src/modules/users/users.controller';
import { UsersService } from '@src/modules/users/users.service';
import { CreateUserRequestStub, UserEntityStub } from '@test/__mocks__/users/users.mock';

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});
describe('UsersController', () => {
  test('should be defined', () => {
    expect(UsersController).toBeDefined();
  });

  test('createUser', async () => {
    const createUserRequestStub = CreateUserRequestStub();
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnValue({ success: true }),
    };
    UsersService.createUser = jest.fn().mockResolvedValue({ success: true });
    const _res = await UsersController.createUser(createUserRequestStub, res as any);
    expect(_res).toEqual({ success: true });
  });

  test('getUserById', async () => {
    const getUserByIdRequestStub = {
      params: {
        id: faker.datatype.uuid(),
      },
      accessTokenDecoded: {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        refreshTokenExpiresIn: faker.datatype.number(),
      },
    };
    const userEntityStub = UserEntityStub();
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnValue(userEntityStub),
    };
    UsersService.getUserById = jest.fn().mockResolvedValue(userEntityStub);
    const _res = await UsersController.getUserById(getUserByIdRequestStub as any, res as any);
    expect(_res).toEqual(userEntityStub);
  });

  test('updateUser', async () => {
    const updateUserRequestStub = CreateUserRequestStub();
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnValue({ success: true }),
    };
    UsersService.updateUser = jest.fn().mockResolvedValue({ affected: true });
    const _res = await UsersController.updateUser(
      { params: { userId: faker.datatype.uuid() }, ...updateUserRequestStub },
      res as any,
    );
    expect(_res).toEqual({ success: true });
  });
});
