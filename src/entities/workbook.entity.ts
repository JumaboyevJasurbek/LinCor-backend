import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VideoEntity } from './video.entity';
import { TakenWorkbook } from './take_workbook';

@Entity({ name: 'workbook' })
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

  @OneToMany(() => TakenWorkbook, (workbook) => workbook.user_id)
  take_user: TakenWorkbook[];
}
