import { CreateUserDto } from './users.dto';
import { User } from './users.entity';
import { BaseRepository } from '../../base/base.repository';

export const UserRepository = {
  createUser: (userData: CreateUserDto) => {
    BaseRepository.create(User, userData);
  },
};
