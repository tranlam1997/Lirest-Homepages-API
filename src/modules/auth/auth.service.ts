import config from 'config';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { RefreshTokensRepository } from './auth.repository';
import ms from 'ms';
import { logger } from 'src/common/logger-config';
import { UsersRepository } from '../users/users.repository';
import { LoginBodyRequest } from './auth.interface';
import { User } from '../users/users.entity';
import { InternalServerErrorException } from 'src/errors/exceptions/internal-server-error.exception';
import { NotFoundException } from 'src/errors/exceptions/not-found.exception';

const authServiceLogger = logger('AuthService');
export const AuthService = {
  async generateJWT(userInfo: User) {
    try {
      const accessSecretKey: string = config.get('jwt.accessSecretKey');
      const refreshSecretKey: string = config.get('jwt.refreshSecretKey');
      const payload = {
        userId: userInfo.id,
        username: userInfo.username,
        email: userInfo.email,
      };
      const accessToken = jwt.sign(payload, accessSecretKey, {
        expiresIn: config.get('jwt.accessTokenExpireIn'),
      });

      const refreshToken = jwt.sign(payload, refreshSecretKey);
      if (userInfo.refreshToken?.id) {
        await RefreshTokensRepository.update(
          { id: userInfo.refreshToken.id },
          { token: refreshToken },
        );
      } else {
        userInfo.refreshToken = await RefreshTokensRepository.create({
          token: refreshToken,
          expiryDate: new Date(Date.now() + ms(config.get('jwt.refreshTokenExpireIn'))),
          user: userInfo,
        });
        UsersRepository.getEntityRepository().save(userInfo);
      }

      return { accessToken, refreshToken };
    } catch (error) {
      throw new InternalServerErrorException({ message: 'Internal server error', error });
    }
  },

  refreshToken(tokenInfo: any) {
    try {
      const accessSecretKey: string = config.get('jwt.accessSecretKey');
      const accessToken = jwt.sign(
        { userId: tokenInfo.userId, email: tokenInfo.email },
        accessSecretKey,
        {
          expiresIn: config.get('jwt.accessTokenExpireIn'),
        },
      );
      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException({ message: 'Internal server error', error });
    }
  },

  async login(requestBody: LoginBodyRequest) {
    const userInfo = await UsersService.getUserByEmail(requestBody.email);

    if (!userInfo) {
      authServiceLogger.error(`User with email ${requestBody.email} not found`);
      throw new NotFoundException('User not found');
    }
    const isValidPassword = await bcrypt.compare(requestBody.password, userInfo.password);

    if (!isValidPassword) {
      authServiceLogger.error(`Invalid password for user with email ${requestBody.email}`);
      throw new NotFoundException('Invalid password');
    }
    const jwtInfo = await this.generateJWT(userInfo);
    return {
      accessToken: jwtInfo.accessToken,
      refreshToken: jwtInfo.refreshToken,
    };
  },
};
