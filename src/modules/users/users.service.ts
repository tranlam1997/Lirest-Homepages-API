import { UsersRepository } from './users.repository';
import bcrypt from 'bcrypt';
import { IUserEntity } from './users.interface';
import { InternalServerErrorException } from 'src/errors/exceptions/internal-server-error.exception';
import { User } from './users.entity';

export const UsersService = {
  async createUser(user: IUserEntity) {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = await bcrypt.hash(user.password as any, salt).catch((err) => {
      throw new InternalServerErrorException(err);
    });
    user.password = hashPass;
    return UsersRepository.create(user);
  },

  async getUserByEmail(email: string) {
    const user: User | null = await UsersRepository.findOne({ where: { email } }, [
      'refreshToken',
    ]).catch(() => null);
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
