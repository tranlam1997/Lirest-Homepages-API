import { CreateUserDto } from '../users/users.dto';
import { UsersRepository } from './users.repository';
import bcrypt from 'bcrypt';

export const UsersService = {
  createUser: async (user: CreateUserDto) => {
    const salt = Math.random();
    const hashPass = await bcrypt.hash(user.password as any, salt);
    user.password = hashPass;
    return UsersRepository.create(user);
  },

  getUserByEmail: async (email: string) => {
    return UsersRepository.findOne({ where: { email } });
  },
};
