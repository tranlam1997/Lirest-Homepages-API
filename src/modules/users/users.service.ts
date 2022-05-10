import { CreateUserDto } from '../users/users.dto';
import { UsersRepository } from './users.repository';

export const UsersService = {
  createUser: async (user: CreateUserDto) => {
    return UsersRepository.create(user);
  },

  getUserByEmail: async (email: string) => {
    return UsersRepository.findOne({ where: { email } });
  },
};
