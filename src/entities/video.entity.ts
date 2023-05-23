import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { WorkbookEntity } from './workbook.entity';
import { WorkbookOpen } from './open_book';
import { TopikEntity } from './topik.entity';

@Entity()
export class VideoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  link: string; 

  @Column({
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  duration: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  sequence: number;

  @ManyToOne(() => CourseEntity, (course) => course.course_videos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course' })
  course: CourseEntity;

  @ManyToOne(() => TopikEntity, (topik) => topik.topik_videos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topik' })
  topik: TopikEntity;

  @OneToMany(() => WorkbookEntity, (workbook) => workbook.video_id)
  workbook: WorkbookEntity[];

  @OneToMany(() => WorkbookOpen, (open_book) => open_book.video_id)
  open_book: WorkbookOpen[];
}
