import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { TestsEntity } from 'src/entities/tests.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TestsEntity])],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
