import { Test, TestingModule } from '@nestjs/testing';
import { SequentialRicksController } from './sequential-ricks.controller';

describe('SequentialRicksController', () => {
  let controller: SequentialRicksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SequentialRicksController],
    }).compile();

    controller = module.get<SequentialRicksController>(
      SequentialRicksController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
