import { Module } from '@nestjs/common';
import { TakeController } from './take.controller';
import { TakeServise } from './take.servise';

@Module({
  controllers: [TakeController],
  providers: [TakeServise],
})
export class TakeModule {}
