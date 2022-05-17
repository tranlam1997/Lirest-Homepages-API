import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: Infinity })
  token: string;

  @Column({ type: 'date' })
  expiryDate: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
