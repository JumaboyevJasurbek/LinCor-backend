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
import { TakenSertifikat } from './taken.sertifikat';

@Entity({name: "sertificate"})
export class Sertifikat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  link: string;

  @ManyToOne(() => CourseEntity, (course) => course.sertifikat, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  course_id: CourseEntity;

  @OneToMany(() => TakenSertifikat, (taken) => taken.sertifikat)
  taken: TakenSertifikat[];
}
