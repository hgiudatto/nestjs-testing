/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { RickandmortyController } from '../rick-and-morty/rickandmorty.controller';
import { RickAndMortyService } from '../rick-and-morty/rickandmorty.service';
import { rickAndMortyStub } from './stubs/rickandmorty.stub';
import { everyRickAndMortyStub } from './stubs/every-rickandmorty.stub';
import { allRickMortyStub } from './stubs/allRickMorty.stub';
import test from 'node:test';
import { RickAndMorty } from 'src/dto/RickAndMorty.dto';

jest.mock('../rick-and-morty/rickandmorty.service');

describe('RickandmortyrickAndMortyController', () => {
  let rickAndMortyController: RickandmortyController;
  let rickAndMortyService: RickAndMortyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [RickandmortyController],
      providers: [RickAndMortyService],
    }).compile();

    rickAndMortyController = moduleRef.get<RickandmortyController>(
      RickandmortyController,
    );
    rickAndMortyService =
      moduleRef.get<RickAndMortyService>(RickAndMortyService);
    jest.clearAllMocks();
  });

  /* it('should be defined', () => {
    expect(rickAndMortyController).toBeDefined();
  }); */

  /* describe('when getRickMorty is called', () => {
      beforeEach(async () => {
        await rickAndMortyController.getRickMorty(rickAndMortyStub().id);
      });

      test('Then it should call service', () => {
        expect(rickAndMortyService.getRickAndMorty).toHaveBeenCalledWith(
          rickAndMortyStub().id,
        );
      });
    }); */

  describe('getAllRickMorty', () => {
    describe('when getAllRickMorty is called', () => {
      let allRicksAndMortys: RickAndMorty[] = [];
      beforeEach(async () => {
        /* @ts-expect-error async */
        allRicksAndMortys = await rickAndMortyController.getAllRickMorty(
          allRickMortyStub(),
        );
      });

      test('then it should call service', () => {
        expect(rickAndMortyService.fetchEveryRickAndMorty).toBeCalledWith(
          allRickMortyStub(),
        );
      });
    });
  });
});
