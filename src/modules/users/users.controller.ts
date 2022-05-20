import { UsersService } from './users.service';
import express from 'express';
import { CreateUserRequestDto } from './users.dto';

export const UsersController = {
  createUser: async (req: CreateUserRequestDto, res: express.Response) => {
    const user = await UsersService.createUser(req.body);
    return res.status(201).send({ userId: user.id });
  },
};
