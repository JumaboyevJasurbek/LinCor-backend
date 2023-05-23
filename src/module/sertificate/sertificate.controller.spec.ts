import { Test, TestingModule } from '@nestjs/testing';
import { SertificateController } from './sertificate.controller';
import { SertificateService } from './sertificate.service';

describe('SertificateController', () => {
  let controller: SertificateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SertificateController],
      providers: [SertificateService],
    }).compile();

    controller = module.get<SertificateController>(SertificateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
