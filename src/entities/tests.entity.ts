import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discount } from './discount.entity';
import { Answer } from 'src/types';

@Entity({ name: 'tests' })
export class TestsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  sequence: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  question: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  option1: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  option2: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  option3: string;

  @Column({
    type: 'enum',
    enum: Answer,
    default: Answer.A,
    nullable: false,
  })
  answer: string;

  @ManyToOne(() => Discount, (discount) => discount.test, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  discount: Discount;
}
