import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 20 })
  firstname: string;

  @Column({ type: 'varchar', length: 20 })
  lastname: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 16 })
  password: string;
}
