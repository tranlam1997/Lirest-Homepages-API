import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/base.repository';
import { User } from './users.entity';

export const UsersRepository = BaseRepository(User as EntityTarget<User>);
