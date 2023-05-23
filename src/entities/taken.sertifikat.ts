import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { Sertifikat } from './sertifikat.entity';

@Entity()
export class TakenSertifikat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsersEntity, (user) => user.open_course, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @ManyToOne(() => Sertifikat, (sertifikat) => sertifikat.taken, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sertifikat' })
  sertifikat: Sertifikat;
}
