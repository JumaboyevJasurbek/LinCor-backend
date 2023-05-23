import { Module } from '@nestjs/common';
import { VedioService } from './vedio.service';
import { VedioController } from './vedio.controller';

@Module({
  controllers: [VedioController],
  providers: [VedioService]
})
export class VedioModule {}
