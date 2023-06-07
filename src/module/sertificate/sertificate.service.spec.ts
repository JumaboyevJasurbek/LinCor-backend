import { Test, TestingModule } from '@nestjs/testing';
import { SertificateService } from './sertificate.service';

describe('SertificateService', () => {
  let service: SertificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SertificateService],
    }).compile();

    service = module.get<SertificateService>(SertificateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
