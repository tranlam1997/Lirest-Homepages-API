import { CreateBookDto } from './books.dto';
import { BooksRepository } from './books.repository';

export const BooksService = {
  createBook: async (book: CreateBookDto) => {
    BooksRepository.create(book);
  },
};
