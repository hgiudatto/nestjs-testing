/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { PromisePool } from '@supercharge/promise-pool';
import { firstValueFrom, catchError } from 'rxjs';
import {
  ReadRickAndMortyResponse,
  ReadRickAndMortyResponseDto,
} from 'src/promise-pool/promise-pool.dto';

@Injectable()
export class PromiseRickMortyPoolService {
  private readonly logger = new Logger(PromiseRickMortyPoolService.name);

  constructor(private readonly httpService: HttpService) {}

  async fetchPooledRickAndMorty(
    userData,
  ): Promise<ReadRickAndMortyResponseDto> {
    const { rickMortyIds } = userData;

    const concurrency: number = 1;

    const retrieveRicks = async (
      rickId: string,
    ): Promise<ReadRickAndMortyResponse> => {
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
          let rickFound: ReadRickAndMortyResponse =
            new ReadRickAndMortyResponse();
          rickFound = data;
          resolve(rickFound);
        }, 5000);
      });
    };

    const { results, errors } = await PromisePool.for(rickMortyIds)
      .onTaskStarted((rick, pool) => {
        console.log(`Inicia la busqueda del avatar: ${rick} ......`);
        console.log(`Progreso: ${pool.processedPercentage()}%`);
        console.log(`Tareas activas: ${pool.processedItems().length}`);
        console.log(`Tareas activas: ${pool.activeTasksCount()}`);
      })
      .onTaskFinished((rick, pool) => {
        console.log(`...... Finaliza la busqueda del avatar: ${rick}`);
      })
      .withConcurrency(concurrency)
      .process(retrieveRicks);

    console.log('Results', results);
    console.log('Errors', errors);

    return { errors, results };
  }
}
