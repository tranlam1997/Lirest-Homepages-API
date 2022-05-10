import express from 'express';
import { CategoriesService } from './categories.service';

export const CategoriesController = {
  createCategory: async (req: express.Request, res: express.Response) => {
    await CategoriesService.createCategory(req.body);
    return res.status(201).json({ message: 'success' });
  },
};
