import { Auth_socials, UserArea } from 'src/types';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { TakeEntity } from './take.entity';
import { TakenDiscount } from './taken_discount';
import { TakenSertifikat } from './taken.sertifikat';
import { TakenWorkbook } from './take_workbook';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 100,
    nullable: true,
  })
  surname: string;

  @Column({
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  image: string;

  @Column({
    type: 'enum',
    enum: UserArea,
    default: UserArea.Toshkent,
    nullable: true,
  })
  area: string;

  @Column({
    type: 'character varying',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  parol: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  phone: number;

  @Column({
    type: 'enum',
    enum: Auth_socials,
    default: Auth_socials.NODEMAILER,
    nullable: false,
  })
  auth_socials: Auth_socials;

  @OneToMany(() => TakeEntity, (course) => course.user_id)
  open_course: TakeEntity[];

  @OneToMany(() => TakenWorkbook, (workbook) => workbook.user_id)
  take_workbook: TakenWorkbook[];

  @OneToMany(() => TakenSertifikat, (sertfikat) => sertfikat.user_id)
  sertfikat: TakenSertifikat[];

  @OneToMany(() => TakenDiscount, (taken) => taken.user)
  taken_discount: TakenDiscount[];
}
