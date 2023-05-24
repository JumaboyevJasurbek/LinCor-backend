import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { UsersEntity } from './users.entity';
import { TopikEntity } from './topik.entity';

@Entity({ name: 'take' })
export class TakeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @ManyToOne(() => UsersEntity, (user) => user.open_course, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: UsersEntity;

  @ManyToOne(() => CourseEntity, (course) => course.open_user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'course_id' })
  course_id: CourseEntity;

  @ManyToOne(() => TopikEntity, (topik) => topik.take_user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'topik_id' })
  topik_id: TopikEntity;
}
