import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discount } from './discount.entity';
import { UsersEntity } from './users.entity';

@Entity({ name: 'take_discount' })
export class TakenDiscount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  win: boolean;

  @ManyToOne(() => Discount, (discount) => discount.taken, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  discount: Discount;

  @ManyToOne(() => UsersEntity, (user) => user.taken_discount, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UsersEntity;
}
