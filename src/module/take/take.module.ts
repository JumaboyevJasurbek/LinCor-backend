import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TakeEntity } from 'src/entities/take.entity';
import { TakeController } from './take.controller';
import { TakeServise } from './take.servise';

@Module({
  imports: [TypeOrmModule.forFeature([TakeEntity])],
  controllers: [TakeController],
  providers: [TakeServise],
})
export class TakeModule {}
