import { Module } from '@nestjs/common';
import { SertificateService } from './sertificate.service';
import { SertificateController } from './sertificate.controller';

@Module({
  controllers: [SertificateController],
  providers: [SertificateService]
})
export class SertificateModule {}
