import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { CourseEntity } from './course.entity';

@Entity({ name: 'take_certificate' })
export class TakenSertifikat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsersEntity, (user) => user.sertfikat, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @ManyToOne(() => CourseEntity, (course) => course.sertifikat, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course' })
  course: CourseEntity;
}
