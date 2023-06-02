import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { WorkbookEntity } from './workbook.entity';

@Entity({ name: 'take_workbook' })
export class TakenWorkbook extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsersEntity, (user) => user.take_workbook, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @ManyToOne(() => WorkbookEntity, (workbook) => workbook.take_user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workbook' })
  workbook: WorkbookEntity;
}
