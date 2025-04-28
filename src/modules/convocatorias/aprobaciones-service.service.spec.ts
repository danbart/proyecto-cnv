import { Test, TestingModule } from '@nestjs/testing';
import { AprobacionesServiceService } from '../aprobaciones-service.service';

describe('AprobacionesServiceService', () => {
  let service: AprobacionesServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AprobacionesServiceService],
    }).compile();

    service = module.get<AprobacionesServiceService>(AprobacionesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
