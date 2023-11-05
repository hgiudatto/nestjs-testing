/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { PromisePool } from '@supercharge/promise-pool';
import { firstValueFrom, catchError } from 'rxjs';
import { ReadRickAndMortyResponseDto } from 'src/promise-pool/promise-pool.dto';

@Injectable()
export class PromiseRickMortyPoolService {
  private readonly logger = new Logger(PromiseRickMortyPoolService.name);

  constructor(private readonly httpService: HttpService) {}

  async fetchPooledRickAndMorty(
    userData,
  ): Promise<ReadRickAndMortyResponseDto> {
    const { rickMortyIds } = userData;

    const concurrency: number = 1;

    const retrieveRicks = async (rickId: string) => {
      return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
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
          resolve(data);
        }, 5000);
      });
    };

    const { results, errors } = await PromisePool.for(rickMortyIds)
      .onTaskStarted((rick) => {
        console.log(`Inicia la busqueda del rick: ${rick}`);
      })
      .onTaskFinished((rick) => {
        console.log(`Finaliza la busqueda del rick: ${rick}`);
      })
      .withConcurrency(concurrency)
      .process(retrieveRicks);

    console.log('Results', results);
    console.log('Errors', errors);

    return { errors, results };
  }
}
