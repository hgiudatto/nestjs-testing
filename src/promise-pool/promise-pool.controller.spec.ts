import { Test, TestingModule } from '@nestjs/testing';
import { PromisePoolController } from './promise-pool.controller';
import { PromiseRickMortyPoolService } from './promise-pool.service';
import { rickAndMortyPromiseAllRefactorStub } from 'src/rick-and-morty/stubs/rickandmortyPromiseAllRefactor.stub';

jest.mock('../promise-pool/__mocks__/promise.pool.service');

describe('PromisePoolController', () => {
  let promisePoolController: PromisePoolController;
  let promiseRickMortyPoolService: PromiseRickMortyPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [PromisePoolController],
      providers: [PromiseRickMortyPoolService],
    }).compile();

    promisePoolController = module.get<PromisePoolController>(
      PromisePoolController,
    );
    promiseRickMortyPoolService = module.get<PromiseRickMortyPoolService>(
      PromiseRickMortyPoolService,
    );
    jest.clearAllMocks();
  });

  describe('getPormiseAllRefactorRickAndMorty', () => {
    describe('When getPormiseAllRefactorRickAndMorty is called', () => {
      beforeEach(async () => {
        await promisePoolController.getPormiseAllRefactorRickAndMorty(
          rickAndMortyPromiseAllRefactorStub(),
        );
      });

      test('Then it should call PromiseRickMortyPoolService', () => {
        expect(
          promiseRickMortyPoolService.fetchPromiseAllRefactorRickAndMorty,
        ).toHaveBeenLastCalledWith(rickAndMortyPromiseAllRefactorStub);
      });
    });
  });
});
