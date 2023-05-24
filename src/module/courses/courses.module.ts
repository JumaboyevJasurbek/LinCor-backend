import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TokenAdminMiddleWare } from 'src/middleware/token.admin.middleware';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, TokenAdminMiddleWare]
})
export class CoursesModule {}
