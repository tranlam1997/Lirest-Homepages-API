import { NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import config from 'config';
import { BaseResponse } from 'src/base/response.base';
import { InvalidRefreshTokensRepository, RefreshTokensRepository } from './auth.repository';
import { UnauthorizedException } from 'src/errors/exceptions/unauthorized.exception';
import {
  MissingAuthTokenException,
  RefreshTokenNotFoundException,
  RefreshTokenExpiredException,
  InvalidRefreshTokenException,
} from './auth.exception';
import { InternalServerErrorException } from 'src/errors/exceptions/internal-server-error.exception';
import { logger } from 'src/common/logger-config';
import { UsersService } from '../users/users.service';
import { BaseRequest } from 'src/base/request.base';
import { IJwt, IRefreshTokenRequest } from './auth.interface';

const Logger = logger('AuthMiddleware');

export const AuthMiddleware = {
  verifyAuth: (req: BaseRequest, _res: BaseResponse, next: NextFunction) => {
    const accessToken = req.headers['authorization']?.split(' ');
    if (!accessToken || accessToken[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid token');
    } else {
      try {
        const decoded = jwt.verify(accessToken[1], config.get('jwt.accessSecretKey')) as IJwt;
        req.accessTokenDecoded = decoded;
        next();
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          throw new UnauthorizedException('Token expired');
        }
        throw new InternalServerErrorException({ message: 'Internal server error', error });
      }
    }
  },

  verifyRefreshTokenBodyRequest: async (
    req: IRefreshTokenRequest,
    _res: BaseResponse,
    next: NextFunction,
  ) => {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      throw new MissingAuthTokenException('Missing refresh token');
    }
  },

  checkIfInvalidRefreshToken: async (
    req: IRefreshTokenRequest,
    _res: BaseResponse,
    next: NextFunction,
  ) => {
    let validRefreshToken = await RefreshTokensRepository.findOne(
      {
        where: { token: req.body.refreshToken },
      },
      ['invalidTokens'],
    );

    if (!validRefreshToken) {
      const invalidToken = await InvalidRefreshTokensRepository.findOne({
        where: { token: req.body.refreshToken },
      });
      if (!invalidToken) {
        throw new RefreshTokenNotFoundException('Invalid refresh token');
      }

      validRefreshToken = await RefreshTokensRepository.findOne({
        where: { token: invalidToken.validToken },
      });

      await InvalidRefreshTokensRepository.delete({ validToken: validRefreshToken.id });
      validRefreshToken.expiresIn = 0;
      validRefreshToken.invalidTokens = [];
      await RefreshTokensRepository.getEntityRepository().save(validRefreshToken);
      throw new RefreshTokenExpiredException(
        'Warning! Someone is trying access your account. For security reasons, please log in again.',
      );
    }

    req.refreshTokenInfo = validRefreshToken;
    next();
  },

  verifyValidRefreshToken: async (
    req: IRefreshTokenRequest,
    _res: BaseResponse,
    next: NextFunction,
  ) => {
    const validRefreshToken = req.refreshTokenInfo;

    if (Date.now() > validRefreshToken.expiresIn * 1000) {
      throw new RefreshTokenExpiredException('Refresh token expired');
    }

    const decoded = jwt.verify(validRefreshToken.token, config.get('jwt.refreshSecretKey')) as IJwt;
    const user = await UsersService.getUserById(decoded.userId);

    if (!user) {
      throw new InvalidRefreshTokenException('Invalid refresh token');
    }
    req.decodedRefreshToken = decoded;
    next();
  },
};
