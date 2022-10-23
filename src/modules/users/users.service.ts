import { UsersRepository } from './users.repository';
import { IUserEntity } from './users.interface';

export const UsersService = {
  async getUserByEmail(email: string) {
    const user = await UsersRepository.findOne({ where: { email } }, ['refreshToken']).catch(
      () => null,
    );
    return user;
  },

  async getUserById(id: string) {
    const user = await UsersRepository.findById(id, ['refreshToken']).catch(() => null);
    return user;
  },

  async updateUser(userId: string, data: Partial<IUserEntity>) {
    return UsersRepository.update({ id: userId }, data);
  },
};
