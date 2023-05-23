import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TakeEntity } from './take.entity';
import { VideoEntity } from './video.entity';
import { Sertifikat } from './sertifikat.entity';
import { Discount } from './discount.entity';

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
    type: 'integer',
    nullable: false,
    unique: true,
  })
  sequence: number;

  @OneToMany(() => VideoEntity, (video) => video.course)
  course_videos: VideoEntity[];

  @OneToMany(() => TakeEntity, (course) => course.course_id)
  open_user: TakeEntity[];

  @OneToMany(() => Sertifikat, (sertifikat) => sertifikat.course_id)
  sertifikat: Sertifikat[];

  @OneToMany(() => Discount, (discount) => discount.course_id)
  discount: Discount[];
}
