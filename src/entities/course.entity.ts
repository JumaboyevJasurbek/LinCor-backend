import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TakeEntity } from './take.entity';
import { VideoEntity } from './video.entity';
import { Discount } from './discount.entity';
import { Sequence } from 'src/types';
import { TakenSertifikat } from './taken.sertifikat';

@Entity({ name: 'courses' })
export class CourseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  price: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  image: string;

  @Column({
    type: 'enum',
    nullable: false,
    default: Sequence.A,
    enum: Sequence,
    unique: true,
  })
  sequence: Sequence;

  @OneToMany(() => VideoEntity, (video) => video.course)
  course_videos: VideoEntity[];

  @OneToMany(() => TakeEntity, (course) => course.course_id)
  open_user: TakeEntity[];

  @OneToMany(() => TakenSertifikat, (sertifikat) => sertifikat.course)
  sertifikat: TakenSertifikat[];

  @OneToMany(() => Discount, (discount) => discount.course_id)
  discount: Discount[];
}
