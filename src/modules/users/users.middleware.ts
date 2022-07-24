import express from 'express';
import { UnauthorizedException } from 'src/errors/exceptions/unauthorized.exception';
import { CreateUserRequestDto, GetUserRequestDto } from './users.dto';
import { UserAlreadyExistsException, UserNotFoundException } from './users.exception';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

export const UsersMiddleware = {
  checkIfUserAlreadyExists: async (
    req: CreateUserRequestDto,
    _res: express.Response,
    next: express.NextFunction,
  ) => {
    const user = await UsersRepository.findOne({
      where: [
        { email: req.body.email },
        { username: req.body.username },
        { phoneNumber: req.body.phoneNumber },
      ],
    });
    if (user) {
      throw new UserAlreadyExistsException('User already exists');
    }
    next();
  },

  checkIfUserExists: async (
    req: GetUserRequestDto,
    _res: express.Response,
    next: express.NextFunction,
  ) => {
    if (req.accessTokenDecoded?.userId !== req.params.id) {
      throw new UnauthorizedException('Invalid user id');
    }
    const user = UsersService.getUserById(req.params.id);
    if (!user) {
      throw new UserNotFoundException('User not found');
    }
    req.data = user;
    next();
  },
};
