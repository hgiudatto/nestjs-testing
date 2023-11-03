/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { PromisePool } from '@supercharge/promise-pool';
import { firstValueFrom, catchError } from 'rxjs';
import { ReadRickAndMortyRequestDto } from 'src/rick-and-morty/rick-and-morty.dto';

@Injectable()
export class PromiseRickMortyPoolService {
  private readonly logger = new Logger(PromiseRickMortyPoolService.name);

  constructor(private readonly httpService: HttpService) {}

  fetchPooledRickAndMorty = async (
    userData: ReadRickAndMortyRequestDto,
  ): Promise<Response | void> => {
    const { rickMortyId } = userData;
    const retrieveRicks = () => {
      return new Promise(async (resolve, reject) => {
        const { data } = await firstValueFrom(
          this.httpService
            .get(`https://rickandmortyapi.com/api/character/${rickMortyId}`)
            .pipe(
              catchError((error: AxiosError) => {
                this.logger.error(error.response.data);
                reject();
                throw 'An error happened!';
              }),
            ),
        );
        await new Promise<void>((resolve) =>
          setTimeout(() => resolve(), 1000),
        ).then(() =>
          console.log('Esperando 1 seg. antes de retornar el proximo Rick.'),
        );
        resolve(data);
      });
    };

    const concurrency: number = 3;

    // const pool = PromisePool(ricksPromiseProducer, concurrency);
    // pool.start().then(() => console.log('Complete'));
    const { results, errors } = await PromisePool.for([+rickMortyId])
      .withConcurrency(concurrency)
      .process(() => {
        retrieveRicks();
      });
    console.log(results);
    console.log(errors);
  };
}
