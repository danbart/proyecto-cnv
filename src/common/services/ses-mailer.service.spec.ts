import { Test, TestingModule } from '@nestjs/testing';
import { SesMailerService } from '../ses-mailer.service';

describe('SesMailerService', () => {
  let service: SesMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SesMailerService],
    }).compile();

    service = module.get<SesMailerService>(SesMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
