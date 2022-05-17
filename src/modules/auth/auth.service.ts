import config from 'config';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { RefreshTokensRepository } from './auth.repository';
import ms from 'ms';

export const AuthService = {
  generateJWT(userInfo: any) {
    try {
      const accessSecretKey: string = config.get('jwt.accessSecretKey');
      const refreshSecretKey: string = config.get('jwt.refreshSecretKey');
      const payload = {
        userId: userInfo.id,
        email: userInfo.email,
      };
      const accessToken = jwt.sign(payload, accessSecretKey, {
        expiresIn: config.get('jwt.accessTokenExpireIn'),
      });
      const refreshToken = jwt.sign(payload, refreshSecretKey);
      userInfo.refreshToken = RefreshTokensRepository.create({
        token: refreshToken,
        expiryDate: new Date(Date.now() + ms(config.get('jwt.refreshTokenExpireIn'))),
        user: userInfo,
      });
      userInfo.save();
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  },

  refreshToken(tokenInfo: any) {
    const accessSecretKey: string = config.get('jwt.accessSecretKey');
    const accessToken = jwt.sign(
      { userId: tokenInfo.userId, email: tokenInfo.email },
      accessSecretKey,
      {
        expiresIn: config.get('jwt.accessTokenExpireIn'),
      },
    );
    return { accessToken };
  },

  async login(requestBody: any) {
    const userInfo = await UsersService.getUserByEmail(requestBody.email);
    if (!userInfo) {
      return {
        message: 'User not found',
        status: 404,
      };
    }
    const result = bcrypt.compare(requestBody.password, userInfo.password);
    if (!result) {
      return {
        message: 'Invalid password',
        status: 400,
      };
    }
    try {
      const jwtInfo = this.generateJWT(userInfo);
      return {
        accessToken: jwtInfo.accessToken,
        refreshToken: jwtInfo.refreshToken,
      };
    } catch (error) {
      return {
        message: 'Error',
        status: 500,
      };
    }
  },
};
