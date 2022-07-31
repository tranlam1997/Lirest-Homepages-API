import { BaseRepository } from '../../base/repository.base';
import { InvalidRefreshTokens, RefreshToken } from './auth.entity';

export const RefreshTokensRepository = BaseRepository<RefreshToken>(RefreshToken);

export const InvalidRefreshTokensRepository =
  BaseRepository<InvalidRefreshTokens>(InvalidRefreshTokens);
