import { Controller, Get } from '@nestjs/common';
import { SertificateService } from './sertificate.service';

@Controller('sertificate')
export class SertificateController {
  constructor(private readonly sertificateService: SertificateService) {}

  @Get('/get')
  get(){
    return this.sertificateService.get()
  }

} 