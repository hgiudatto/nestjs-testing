import { Test, TestingModule } from '@nestjs/testing';
import { PromisePoolController } from './promise-pool.controller';

describe('PromisePoolController', () => {
  let controller: PromisePoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromisePoolController],
    }).compile();

    controller = module.get<PromisePoolController>(PromisePoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
