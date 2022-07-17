import express from 'express';
import { CreateUserRequestDto } from './users.dto';
import { UsersRepository } from './users.repository';

export const UsersMiddleware = {
  checkUserExists: async (
    req: CreateUserRequestDto,
    res: express.Response,
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
      return res.status(400).json({ message: 'User already exists' });
    }
    next();
  },
};
