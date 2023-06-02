import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { OpenWorkbookController } from './open_workbook.controller';
import { OpenWorkbookService } from './open_workbook.service';

@Module({
  imports: [HttpModule],
  controllers: [OpenWorkbookController],
  providers: [OpenWorkbookService],
})
export class OpenWorkbookModule {}
