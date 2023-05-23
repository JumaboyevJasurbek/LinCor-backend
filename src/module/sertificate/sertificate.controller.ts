import { Controller } from '@nestjs/common';
import { SertificateService } from './sertificate.service';

@Controller('sertificate')
export class SertificateController {
  constructor(private readonly sertificateService: SertificateService) {}
} 