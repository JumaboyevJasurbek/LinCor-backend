import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { VideoEntity } from 'src/entities/video.entity';
import { TakeEntity } from 'src/entities/take.entity';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, VideoEntity, TakeEntity],
})
export class CoursesModule {}
