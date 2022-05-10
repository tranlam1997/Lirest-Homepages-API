import { CreateCategoryDto } from './categories.dto';
import { CategoriesRepository } from './categories.repository';

export const CategoriesService = {
  createCategory: async (category: CreateCategoryDto) => {
    return CategoriesRepository.create(category);
  },
};
