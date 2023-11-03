import { Test, TestingModule } from '@nestjs/testing';

describe('PromiseRickMortyPoolService', () => {
  let service: PromiseRickMortyPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromiseRickMortyPoolService],
    }).compile();

    service = module.get<PromiseRickMortyPoolService>(
      PromiseRickMortyPoolService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
