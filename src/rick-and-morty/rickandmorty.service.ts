/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  getCharacters,
  Character,
  ApiResponse,
  Info,
  CharacterLocation,
} from 'rickmortyapi';
import { AxiosError } from 'axios';
import {
  ReadOneRickAndMortyRequestDto,
  ReadRickAndMortyResponse,
} from './rick-and-morty.dto';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RickAndMortyService {
  private readonly logger = new Logger(RickAndMortyService.name);
  constructor(private readonly httpService: HttpService) {}

  sleepFetchRickMortys = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

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

  retrieveRicks = async (rickId: string): Promise<ReadRickAndMortyResponse> => {
    return new Promise(async (resolve, reject) => {
      const dateStarted = new Date();
      const millisStart = dateStarted.getMilliseconds();
      const secsStart = dateStarted.getSeconds();
      const minsStart = dateStarted.getMinutes();
      const hourStart = dateStarted.getHours();
      const fullTimeSearchStarted = `${hourStart}:${minsStart}:${secsStart}:${millisStart}`;
      this.logger.debug(`Search started out at: ${fullTimeSearchStarted}`);
      const { data } = await firstValueFrom(
        this.httpService
          .get(`https://rickandmortyapi.com/api/character/${rickId}`)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              reject();
              throw 'An error happened!';
            }),
          ),
      );
      let rickFound: ReadRickAndMortyResponse = new ReadRickAndMortyResponse();
      rickFound = data;
      resolve(rickFound);
      const dateFinished = new Date();
      const millisFinish = dateFinished.getMilliseconds();
      const secsFinish = dateFinished.getSeconds();
      const minsFinish = dateFinished.getMinutes();
      const hourFinish = dateFinished.getHours();
      const fullTimeSearchFinished = `${hourFinish}:${minsFinish}:${secsFinish}:${millisFinish}`;
      this.logger.debug(`Search Finished at: ${fullTimeSearchFinished}`);
    });
  };

  async fetchEveryRickAndMorty(userData) {
    const { rickMortyIds } = userData;
    const goodRicks = [];

    const getSearchedRicks = async (rickMorty) => {
      this.sleepFetchRickMortys(3000);
      return new Promise(async (resolve) => {
        const response: ReadRickAndMortyResponse = await this.retrieveRicks(
          rickMorty,
        );
        const successfulRick = response;
        if (!!response) {
          goodRicks.push(successfulRick);
        }
        resolve(response);
      });
    };

    for (const rickMortyId of rickMortyIds) {
      this.logger.debug(`Retrieve rick with id: ${rickMortyId}`);
      await getSearchedRicks(rickMortyId);
    }

    return { goodRicks };
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
    userData: ReadOneRickAndMortyRequestDto,
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
