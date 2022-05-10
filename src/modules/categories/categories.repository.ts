import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/base.repository';
import { Category } from './categories.entity';

export const CategoriesRepository = BaseRepository(Category as EntityTarget<Category>);
