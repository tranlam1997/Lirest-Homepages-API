import { Book } from '../books/books.entity';

export interface CreateCategoryDto {
  name?: string;
  books?: Book[];
}

export type UpdateUserDto = Required<CreateCategoryDto>;
