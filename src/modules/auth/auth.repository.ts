import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/base.repository';
import { Book } from './auth.entity';

export const BooksRepository = BaseRepository(Book as EntityTarget<Book>);
