import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/repository.base';
import { RefreshToken } from './auth.entity';

export const RefreshTokensRepository = BaseRepository<RefreshToken>(RefreshToken);
