import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TakeEntity } from './take.entity';
import { VideoEntity } from './video.entity';
import { Sequence } from 'src/types';

@Entity()
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
    type: 'enum',
    nullable: false,
    default: Sequence.A,
    enum: Sequence,
    unique: true,
  })
  sequence: Sequence;

  @OneToMany(() => VideoEntity, (video) => video.topik)
  topik_videos: VideoEntity[];

  @OneToMany(() => TakeEntity, (take) => take.topik_id)
  take_user: TakeEntity[];
}
