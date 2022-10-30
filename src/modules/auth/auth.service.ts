import config from 'config';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcryptjs';
import { InvalidRefreshTokensRepository, RefreshTokensRepository } from './auth.repository';
import ms from 'ms';
import { logger } from '@src/common/logger-config';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/users.entity';
import { InternalServerErrorException } from '@src/errors/exceptions/internal-server-error.exception';
import { NotFoundException } from '@src/errors/exceptions/not-found.exception';
import { ILoginBodyRequest, IRefreshTokenRequest } from './auth.interface';
import { IUserEntity } from '../users/users.interface';
import { sendMail } from '@src/common/sendgrid';
import { IResultResponse, ResultResponse } from '@src/shared/response';
import { HttpStatusCode } from '@src/errors/errors.enum';
import { compileTemplate } from '@src/shared/handlebars';

const {
  accessSecretKey,
  refreshSecretKey,
  accessTokenExpireIn,
  refreshTokenExpireIn,
}: Record<string, string> = config.get('jwt');

const authServiceLogger = logger('AuthService');

export const AuthService = {
  async generateJWT(userInfo: User) {
    try {
      const refreshTokenExpiresIn: number =
        Math.floor(Date.now() + +ms(refreshTokenExpireIn)) / 1000;
      const payload = {
        userId: userInfo.id,
        username: userInfo.username,
        refreshTokenExpiresIn,
      };
      const accessToken = jwt.sign(payload, accessSecretKey, {
        expiresIn: accessTokenExpireIn,
      });
      const refreshToken = jwt.sign(payload, refreshSecretKey);

      if (userInfo.refreshToken?.id) {
        const refreshTokenInfo = await RefreshTokensRepository.findOne({
          where: { id: userInfo.refreshToken.id },
        });
        InvalidRefreshTokensRepository.delete({
          validToken: userInfo.refreshToken.id,
        }),
          (refreshTokenInfo.token = refreshToken);
        refreshTokenInfo.expiresIn = refreshTokenExpiresIn;
        refreshTokenInfo.invalidTokens = [];
        await RefreshTokensRepository.getEntityRepository().save(refreshTokenInfo);
      } else {
        userInfo.refreshToken = await RefreshTokensRepository.create({
          token: refreshToken,
          expiresIn: refreshTokenExpiresIn,
          user: userInfo,
        });
        UsersRepository.getEntityRepository().save(userInfo);
      }

      return ResultResponse.send({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      throw new InternalServerErrorException({ message: 'Internal server error', error });
    }
  },

  async refreshToken({
    body: { refreshToken },
    decodedRefreshToken,
    refreshTokenInfo,
  }: IRefreshTokenRequest) {
    try {
      const payload = {
        userId: decodedRefreshToken.userId,
        username: decodedRefreshToken.username,
        refreshTokenExpiresIn: decodedRefreshToken.refreshTokenExpiresIn,
      };

      const accessToken = jwt.sign(payload, accessSecretKey, {
        expiresIn: accessTokenExpireIn,
      });

      const newRefreshToken = jwt.sign(payload, refreshSecretKey);
      refreshTokenInfo.token = newRefreshToken;

      refreshTokenInfo.invalidTokens = refreshTokenInfo.invalidTokens.concat(
        await InvalidRefreshTokensRepository.create({
          token: refreshToken,
        }),
      );

      RefreshTokensRepository.getEntityRepository().save(refreshTokenInfo);

      return ResultResponse.send({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      throw new InternalServerErrorException({ message: 'Internal server error', error });
    }
  },

  async login({ email, password }: ILoginBodyRequest) {
    const userInfo = await UsersService.getUserByEmail(email);

    if (!userInfo) {
      authServiceLogger.error(`User with email ${email} not found`);
      throw new NotFoundException('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, userInfo.password);

    if (!isValidPassword) {
      authServiceLogger.error(`Invalid password for user with email ${email}`);
      throw new NotFoundException('Invalid password');
    }
    return this.generateJWT(userInfo);
  },

  async signup(user: IUserEntity): Promise<IResultResponse> {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPass = await bcrypt.hash(user.password as any, salt).catch((err) => {
        throw new InternalServerErrorException(err);
      });
      user.password = hashPass;
      await UsersRepository.create(user);
      const template = compileTemplate('emails/verify-account.hbs');
      const html = template({ name: user.username, email: user.email });

      sendMail({
        to: user.email,
        from: config.get<string>('sendgrid.from'),
        subject: 'Verify your account',
        text: 'Please verify your account',
        html,
      });
      return ResultResponse.send({}, 'User created successfully', HttpStatusCode.CREATED);
    } catch (error) {
      throw new InternalServerErrorException({ message: 'Internal server error', error });
    }
  },
};
