import config from 'config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const AuthService = {
  generateJWT: (requestBody: any) => {
    const accessSecretKey: string = config.get('jwt.accessSecretKey');
    const refreshSecretKey: string = config.get('jwt.refreshSecretKey');
    const refreshId = requestBody.id + accessSecretKey;
    const salt: crypto.KeyObject = crypto.createSecretKey(crypto.randomBytes(16));
    const hash: string = crypto.createHmac('sha256', salt).update(refreshId).digest('hex');
    requestBody.refreshKey = salt.export();
    const accessToken = jwt.sign(requestBody, accessSecretKey, {
      expiresIn: config.get('jwt.accessTokenExpireIn'),
    });
    const refreshToken = jwt.sign({ hash }, refreshSecretKey, {
      expiresIn: config.get('jwt.refreshTokenExpireIn'),
    });
    return { accessToken, refreshToken };
  },
};
