import express from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { Jwt, VerifyAuthResponse } from './auth.interface';

export const verifyAuth = async (
  req: express.Request,
  res: VerifyAuthResponse,
  next: express.NextFunction,
) => {
  const accessToken = req.headers['authorization']?.split(' ');
  if (!accessToken || accessToken[0] !== 'Bearer') {
    return res.status(401).json({
      message: 'Unauthorized',
      status: 401,
    });
  } else {
    const decoded = jwt.verify(accessToken[1], config.get('jwt.accessSecretKey')) as Jwt;
    res.decoded = decoded;
  }
  next();
};

export const verifyBodyRequest = (
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
};
