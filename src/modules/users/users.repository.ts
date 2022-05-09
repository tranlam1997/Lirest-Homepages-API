import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/base.repository';
import { User } from './users.entity';

export const UserRepository = BaseRepository(User as EntityTarget<User>);
