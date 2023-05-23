import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TakeEntity } from './take.entity';
import { VideoEntity } from './video.entity';

@Entity({name: "topic"})
export class TopikEntity extends BaseEntity {
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

  @OneToMany(() => VideoEntity, (video) => video.topik)
  topik_videos: VideoEntity[];

  @OneToMany(() => TakeEntity, (take) => take.topik_id)
  take_user: TakeEntity[];
}
