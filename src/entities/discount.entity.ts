import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { TakenDiscount } from './taken_discount';
import { TestsEntity } from './tests.entity';

@Entity()
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  percentage: string;

  @ManyToOne(() => CourseEntity, (course) => course.discount, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  course_id: CourseEntity;

  @OneToMany(() => TakenDiscount, (taken) => taken.discount)
  taken: TakenDiscount[];

  @OneToMany(() => TestsEntity, (test) => test.discount)
  test: TestsEntity[];
}
