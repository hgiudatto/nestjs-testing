import { HttpService } from '@nestjs/axios';
import { RickAndMortyService } from './rickandmorty.service';
import { BadRequestException } from '@nestjs/common';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

describe('RickAndMortyService', () => {
  let rickAndMortyService: RickAndMortyService;
  let httpService: DeepMocked<HttpService>;

  const expectedCharacter = {
    created: '',
    episode: [],
    gender: 'Male',
    id: 7,
    image: '',
    location: {
      name: 'Testicle Monster Dimension',
      url: 'https://rickandmortyapi.com/api/location/21',
    },
    name: 'Abradolf Lincler',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    species: 'Human',
    status: 'unknown',
    type: 'Genetic experiment',
    url: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RickAndMortyService],
    })
      .useMocker(createMock)
      .compile();

    rickAndMortyService = module.get<RickAndMortyService>(RickAndMortyService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(rickAndMortyService).toBeDefined();
  });

  describe('getRickAndMorty', () => {
    it('RickAndMorty ID less than 1 should throw error', async () => {
      const getRickAndMorty = rickAndMortyService.getRickAndMorty(0);
      await expect(getRickAndMorty).rejects.toBeInstanceOf(BadRequestException);
    });

    it('RickAndMorty ID greater than 826 should throw error', async () => {
      const getRickAndMorty = rickAndMortyService.getRickAndMorty(827);
      await expect(getRickAndMorty).rejects.toBeInstanceOf(BadRequestException);
    });

    it('valid RickAndMorty name to return the RickAndMorty character', async () => {
      const getRickAndMorty =
        rickAndMortyService.getRickAndMortyByName('abradolf');
      await expect(getRickAndMorty).resolves.toEqual(expectedCharacter);
    });

    it('Valid RickAndMorty to return RickAndMorty name', async () => {
      httpService.axiosRef.mockResolvedValueOnce;
      ({
        data: {
          created: '',
          episode: [],
          gender: 'Male',
          id: 7,
          image: '',
          location: {
            name: 'Testicle Monster Dimension',
            url: 'https://rickandmortyapi.com/api/location/21',
          },
          name: 'Abradolf Lincler',
          origin: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          species: 'Human',
          status: 'unknown',
          type: 'Genetic experiment',
          url: '',
        },
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });

      const getRickAndMorty =
        rickAndMortyService.getRickAndMortyByName('Abradolf');

      await expect(getRickAndMorty).resolves.toEqual(expectedCharacter);
    });

    it('If RickAndMorty respose unexpectedly changes, throw an error', async () => {
      httpService.axiosRef.mockResolvedValueOnce;
      ({
        data: 'Unexpected data',
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });

      const getRickAndMorty =
        rickAndMortyService.getRickAndMortyByName('bulbasaur');

      await expect(getRickAndMorty).rejects.toBeInstanceOf(TypeError);
    });
  });
});
