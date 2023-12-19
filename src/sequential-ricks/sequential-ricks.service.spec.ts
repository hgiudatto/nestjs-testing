import { Test, TestingModule } from '@nestjs/testing';
import { SequentialRicksService } from './sequential-ricks.service';

describe('SequentialRicksService', () => {
  let service: SequentialRicksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SequentialRicksService],
    }).compile();

    service = module.get<SequentialRicksService>(SequentialRicksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
