import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { User } from '../users/users.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  author: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', unique: true })
  ISBN: string;

  @Column({ type: 'double', unsigned: true })
  price: number;

  @Column({ type: 'int', unsigned: true })
  quantity: number;

  @ManyToOne(() => Category, (category) => category.books)
  category: Category;

  @ManyToOne(() => User, (user) => user.books)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
