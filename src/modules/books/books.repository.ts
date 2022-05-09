import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/base.repository';
import { Book } from './books.entity';

export const BooksRepository = BaseRepository(Book as EntityTarget<Book>);
