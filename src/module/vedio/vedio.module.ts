import { Module } from '@nestjs/common';
import { VedioService } from './vedio.service';
import { VedioController } from './vedio.controller';
import { TokenAdminMiddleWare } from 'src/middleware/token.admin.middleware';
import { TokenUserMiddleWare } from 'src/middleware/token.user.middleware';

@Module({
  controllers: [VedioController],
  providers: [VedioService, TokenAdminMiddleWare, TokenUserMiddleWare],
})
export class VedioModule {}
