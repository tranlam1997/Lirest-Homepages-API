import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/repository.base';
import { Book } from './books.entity';

export const BooksRepository = BaseRepository(Book as EntityTarget<Book>);
