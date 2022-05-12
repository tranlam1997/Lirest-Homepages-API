import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/repository.base';
import { Book } from './auth.entity';

export const BooksRepository = BaseRepository(Book as EntityTarget<Book>);
