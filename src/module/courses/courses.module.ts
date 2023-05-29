import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { VideoEntity } from 'src/entities/video.entity';
import { TakeEntity } from 'src/entities/take.entity';
import { TokenUserMiddleWare } from 'src/middleware/token.user.middleware';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, VideoEntity, TakeEntity, TokenUserMiddleWare],
})
export class CoursesModule {}
