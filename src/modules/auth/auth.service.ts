import config from 'config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';

export const AuthService = {
  generateJWT(userInfo: any) {
    try {
      const accessSecretKey: string = config.get('jwt.accessSecretKey');
      const refreshSecretKey: string = config.get('jwt.refreshSecretKey');
      const refreshId = userInfo.id + accessSecretKey;
      const salt: crypto.KeyObject = crypto.createSecretKey(crypto.randomBytes(16));
      const hash: string = crypto.createHmac('sha256', salt).update(refreshId).digest('hex');
      const accessToken = jwt.sign(
        { userId: userInfo.id, email: userInfo.email, refreshKey: salt.export() },
        accessSecretKey,
        {
          expiresIn: config.get('jwt.accessTokenExpireIn'),
        },
      );
      const refreshToken = jwt.sign({ secretCode: hash }, refreshSecretKey, {
        expiresIn: config.get('jwt.refreshTokenExpireIn'),
      });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  },

  refreshToken(tokenInfo: any) {
    const accessSecretKey: string = config.get('jwt.accessSecretKey');
    const accessToken = jwt.sign(
      { userId: tokenInfo.userId, email: tokenInfo.email, refreshKey: tokenInfo.refreshKey },
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
