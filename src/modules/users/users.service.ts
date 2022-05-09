import { CreateUserDto } from '../users/users.dto';
import { UserRepository } from './users.repository';

export const UsersService = {
  createUser: async (user: CreateUserDto) => {
    return UserRepository.create(user);
  },
};
