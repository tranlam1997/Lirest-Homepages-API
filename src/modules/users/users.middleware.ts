import express from 'express';
import { UsersRepository } from './users.repository';

export const UsersMiddleware = {
  checkUserExists: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const user = await UsersRepository.findOne({
      where: [
        { email: req.body.email },
        { username: req.body.username },
        { phone: req.body.phone },
      ],
    });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    next();
  },
};
