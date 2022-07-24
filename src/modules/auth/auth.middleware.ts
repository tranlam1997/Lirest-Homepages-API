import { NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import config from 'config';
import { Jwt } from './auth.interface';
import { BaseResponse } from 'src/base/response.base';
import { RefreshTokensRepository } from './auth.repository';
import { AuthRequest, RefreshTokenRequestDto } from './auth.dto';
import { UnauthorizedException } from 'src/errors/exceptions/unauthorized.exception';
import {
  MissingAuthTokenException,
  RefreshTokenNotFoundException,
  RefreshTokenExpiredException,
  InvalidRefreshTokenException,
} from './auth.exception';
import { InternalServerErrorException } from 'src/errors/exceptions/internal-server-error.exception';
import { logger } from 'src/common/logger-config';

const authMiddleWareLogger = logger('AuthMiddleware');

export const AuthMiddleware = {
  verifyAuth: (req: AuthRequest, _res: BaseResponse, next: NextFunction) => {
    authMiddleWareLogger.info('Request data', { req });
    const accessToken = req.headers['authorization']?.split(' ');
    if (!accessToken || accessToken[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid token');
    } else {
      try {
        const decoded = jwt.verify(accessToken[1], config.get('jwt.accessSecretKey')) as Jwt;
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
    req: RefreshTokenRequestDto,
    _res: BaseResponse,
    next: NextFunction,
  ) => {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      throw new MissingAuthTokenException('Missing refresh token');
    }
  },

  verifyRefreshToken: async (
    req: RefreshTokenRequestDto,
    _res: BaseResponse,
    next: NextFunction,
  ) => {
    try {
      const refreshToken = await RefreshTokensRepository.findOne({
        where: { token: req.body.refreshToken },
      });
      if (!refreshToken) {
        throw new RefreshTokenNotFoundException('Not found refresh token');
      }

      if (Date.now() > refreshToken.expiryDate.getTime()) {
        throw new RefreshTokenExpiredException('Refresh token expired');
      }

      const decoded = jwt.verify(refreshToken.token, config.get('jwt.refreshSecretKey')) as Jwt;

      if (decoded.userId !== refreshToken.user.id) {
        throw new InvalidRefreshTokenException('Invalid refresh token');
      }
      next();
    } catch (error) {
      throw new InternalServerErrorException({ message: `Error verifying refresh token:`, error });
    }
  },
};
