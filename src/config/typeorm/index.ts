import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { CourseEntity } from 'src/entities/course.entity';
import { Discount } from 'src/entities/discount.entity';
import { WorkbookOpen } from 'src/entities/open_book';
import { TakeEntity } from 'src/entities/take.entity';
import { TakenWorkbook } from 'src/entities/take_workbook';
import { TakenSertifikat } from 'src/entities/taken.sertifikat';
import { TakenDiscount } from 'src/entities/taken_discount';
import { TestsEntity } from 'src/entities/tests.entity';
import { TopikEntity } from 'src/entities/topik.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { VideoEntity } from 'src/entities/video.entity';
import { WorkbookEntity } from 'src/entities/workbook.entity';
dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [
    CourseEntity,
    Discount,
    WorkbookOpen,
    TakeEntity,
    TakenDiscount,
    TakenSertifikat,
    TestsEntity,
    TopikEntity,
    UsersEntity,
    VideoEntity,
    WorkbookEntity,
    TakenWorkbook,
  ],
  autoLoadEntities: true,
  synchronize: true,
};
