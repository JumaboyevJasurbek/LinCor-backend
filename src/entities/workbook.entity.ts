import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VideoEntity } from './video.entity';

@Entity()
export class WorkbookEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  pdf: string;

  @ManyToOne(() => VideoEntity, (video) => video.workbook, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  video_id: VideoEntity;
}
