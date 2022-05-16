import express from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import {
  AccessToken,
  RefreshToken,
  RefreshTokenRequest,
  VerifyAuthRequest,
} from './auth.interface';
import crypto from 'crypto';

export const AuthMiddleware = {
  verifyAuth: async (req: VerifyAuthRequest, res: express.Response, next: express.NextFunction) => {
    const accessToken = req.headers['authorization']?.split(' ');
    if (!accessToken || accessToken[0] !== 'Bearer') {
      return res.status(401).json({
        message: 'Unauthorized',
        status: 401,
      });
    } else {
      try {
        const decoded = jwt.verify(
          accessToken[1],
          config.get('jwt.accessSecretKey'),
        ) as AccessToken;
        req.accessTokenDecoded = decoded;
        next();
      } catch (error) {
        return res.status(401).json({
          message: 'Unauthorized',
          status: 401,
        });
      }
    }
  },

  verifyBodyRequest: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      return res.status(400).send({
        message: `Missing refresh token`,
      });
    }
  },

  verifyRefreshToken: async (
    req: RefreshTokenRequest,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const refreshToken = req.body.refreshToken;
      const { userId, refreshKey } = req.accessTokenDecoded;
      const decoded = jwt.verify(refreshToken, config.get('jwt.refreshSecretKey')) as RefreshToken;
      const hashFromRefreshToken = decoded.secretCode;
      const refreshId = userId + config.get('jwt.accessSecretKey');
      const hashCodeToCompare = crypto
        .createHmac('sha256', crypto.KeyObject.from(refreshKey))
        .update(refreshId)
        .digest('hex');
      if (hashFromRefreshToken === hashCodeToCompare) {
        return next();
      } else {
        return res.status(400).send({
          message: `Invalid refresh token`,
        });
      }
    } catch (error) {
      return res.status(400).send({
        message: `Invalid refresh token`,
      });
    }
  },
};
