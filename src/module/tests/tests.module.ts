import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { TestsEntity } from 'src/entities/tests.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
