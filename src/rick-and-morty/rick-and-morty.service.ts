/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  getCharacters,
  Character,
  ApiResponse,
  Info,
  CharacterLocation,
} from 'rickmortyapi';
import axios, { AxiosError } from 'axios';
import {
  ReadRickAndMortyRequestDto,
  ReadRickAndMortyResponse,
} from './rick-and-morty.dto';
import { firstValueFrom, of, defer } from 'rxjs';
import { retry, retryWhen, delay, take, map, catchError } from 'rxjs/operators';
import { resolve } from 'path';

@Injectable()
export class RickAndMortyService {
  private readonly logger = new Logger(RickAndMortyService.name);
  constructor(private readonly httpService: HttpService) {}

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

  delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  delayPost = (cb: () => void, ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms)).then(cb);
  };

  fetchRickAndMorty = async (
    userData: ReadRickAndMortyRequestDto,
  ): Promise<Response | void> => {
    const { rickMortyId } = userData;
    console.log('Waiting 5 secs before post...');
    /* await this.delayPost(
      () =>
        console.log(
          ` POST -> https://rickandmortyapi.com/api/character/${rickMortyId}`,
        ),
      5000,
    ); */
    await new Promise<void>((resolve) =>
      setTimeout(() => resolve(), 5000),
    ).then(() => {
      console.log(
        ` POST -> https://rickandmortyapi.com/api/character/${rickMortyId}`,
      );
    });
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://rickandmortyapi.com/api/character/${rickMortyId}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
    /* const { rickMortyId } = userData;
    this.logger.debug(`Searching for id: `, rickMortyId);
    let data;
    defer(async () => {
      data = await firstValueFrom(
        this.httpService
          .get(`https://rickandmortyapi.com/api/character/${rickMortyId}`)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );
    })
      .pipe(delay(5000))
      .subscribe(data); */
  };
}
