import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  getCharacters,
  Character,
  ApiResponse,
  Info,
  CharacterLocation,
} from 'rickmortyapi';
import fetch from 'node-fetch';

@Injectable()
export class RickAndMortyService {
  constructor(private httpService: HttpService) {}

  async getRickAndMorty(id: number) {
    if (id < 1 || id > 826)
      throw new BadRequestException('Invalid RickAndMorty ID');

    const { data } = await this.httpService.axiosRef({
      url: `https://rickandmortyapi.com/api/character/${id}`,
      method: 'GET',
    });

    if (!data) {
      throw new TypeError();
    }

    return data.results[0].name;
  }

  getRickAndMortyByName = async (
    rickAndMortyName: string,
  ): Promise<Character> => {
    const rickAndMorty: ApiResponse<Info<Character[]>> = await getCharacters({
      name: `${rickAndMortyName}`,
    });
    const character: Character = {
      id: rickAndMorty.data.results[0].id,
      name: rickAndMorty.data.results[0].name,
      status: rickAndMorty.data.results[0].status,
      species: rickAndMorty.data.results[0].species,
      type: rickAndMorty.data.results[0].type,
      gender: rickAndMorty.data.results[0].gender,
      origin: rickAndMorty.data.results[0].origin,
      location: rickAndMorty.data.results[0].location as CharacterLocation,
      image: '',
      episode: [],
      url: '',
      created: '',
    };
    return character;
  };

  fetchRickAndMorty = async (id: number) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`,
        { headers: { 'Content-Type': 'application/json' } },
      );

      const data = await response.json();

      return data;
    } catch (err) {
      return err;
    }
  };
}
