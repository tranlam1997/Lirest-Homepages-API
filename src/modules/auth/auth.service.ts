import { CreateBookDto } from './auth.dto';
import { BooksRepository } from './auth.repository';

export const BooksService = {
  createBook: async (book: CreateBookDto) => {
    BooksRepository.create(book);
  },
};
