import express from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import config from 'config';
import { Jwt, VerifyAuthRequest } from './auth.interface';
import { BaseRequest } from 'src/base/request.base';
import { BaseResponse } from 'src/base/response.base';
import { RefreshTokensRepository } from './auth.repository';

export const AuthMiddleware = {
  verifyAuth: async (req: VerifyAuthRequest, res: express.Response, next: express.NextFunction) => {
    const accessToken = req.headers['authorization']?.split(' ');
    console.log(
      '🚀 ~ file: auth.middleware.ts ~ line 15 ~ verifyAuth: ~ accessToken',
      !accessToken,
    );
    if (!accessToken || accessToken[0] !== 'Bearer') {
      return res.status(401).json({
        message: 'Unauthorized',
        status: 401,
      });
    } else {
      try {
        const decoded = jwt.verify(accessToken[1], config.get('jwt.accessSecretKey')) as Jwt;
        req.accessTokenDecoded = decoded;
        next();
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          return res.status(401).json({
            message: 'Token expired',
            status: 401,
          });
        }
        return res.status(401).json({
          message: 'Unauthorized',
          status: 401,
        });
      }
    }
  },

  verifyBodyRequest: async (req: BaseRequest, res: BaseResponse, next: express.NextFunction) => {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      return res.status(400).send({
        message: `Missing refresh token`,
      });
    }
  },

  verifyRefreshToken: async (req: BaseRequest, res: BaseResponse, next: express.NextFunction) => {
    try {
      const refreshToken = await RefreshTokensRepository.findOne({
        where: { token: req.body.refreshToken },
      });
      if (!refreshToken) {
        return res.status(400).send({
          message: `Invalid refresh token`,
        });
      }

      if (Date.now() > refreshToken.expiryDate.getTime()) {
        return res.status(400).send({
          message: `Refresh token expired`,
        });
      }

      const decoded = jwt.verify(refreshToken.token, config.get('jwt.refreshSecretKey')) as Jwt;

      if (decoded.userId !== refreshToken.user.id) {
        return res.status(400).send({
          message: `Invalid refresh token`,
        });
      }
      next();
    } catch (error) {
      return res.status(400).send({
        message: `Invalid refresh token`,
      });
    }
  },
};
