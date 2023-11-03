import { Test, TestingModule } from '@nestjs/testing';
import { RickandmortyController } from './rickandmorty.controller';
import { RickAndMortyService } from './rick-and-morty.service';
import { rickAndMortyStub } from './stubs/rickandmorty.stub';

jest.mock('../rick-and-morty/__mocks__/rick-and-morty.service');

describe('RickandmortyController', () => {
  let controller: RickandmortyController;
  let service: RickAndMortyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [RickandmortyController],
      providers: [RickAndMortyService],
    }).compile();

    controller = module.get<RickandmortyController>(RickandmortyController);
    service = module.get<RickAndMortyService>(RickAndMortyService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRickMorty', () => {
    describe('When getRickMorty is called', () => {
      beforeEach(async () => {
        await controller.getRickMorty({ rickMortyId: '10' });
      });
    });
  });
});
