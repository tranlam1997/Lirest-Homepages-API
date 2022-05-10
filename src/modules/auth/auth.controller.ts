import { BooksService } from './auth.service';
import express from 'express';

export const BooksController = {
  createBook: async (req: express.Request, res: express.Response) => {
    await BooksService.createBook(req.body);
    res.status(201).json({ message: 'Book created successfully' });
  },
};
