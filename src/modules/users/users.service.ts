import { UsersRepository } from './users.repository';
import bcrypt from 'bcrypt';
import { UserEntity } from './users.interface';

export const UsersService = {
  async createUser(user: UserEntity) {
    const salt = Math.random();
    const hashPass = await bcrypt.hash(user.password as any, salt);
    user.password = hashPass;
    return UsersRepository.create(user);
  },

  async getUserByEmail(email: string) {
    const user = await UsersRepository.findOne({ where: { email } }, ['refreshToken']).catch(
      () => null,
    );
    return user;
  },

  async getUserById(id: string) {
    const user = await UsersRepository.findById(id).catch(() => null);
    return user;
  },
};
