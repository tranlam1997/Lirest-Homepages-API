import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/repository.base';
import { Category } from './categories.entity';

export const CategoriesRepository = BaseRepository(Category as EntityTarget<Category>);
