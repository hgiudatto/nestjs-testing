/* eslint-disable @typescript-eslint/no-var-requires */
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
import getRicks from '../helpers/fetchRickAndMortys';
import { ftruncate } from 'fs';
const promiseLimit = require('promise-limit');

@Injectable()
export class PromiseRickMortyPoolService {
  private readonly logger = new Logger(PromiseRickMortyPoolService.name);

  constructor(private readonly httpService: HttpService) {}

  async fetchPooledRickAndMorty(
    userData,
  ): Promise<void | ReadRickAndMortyResponseDto> {
    const { rickMortyIds } = userData;

    const concurrency: number = 1;

    const { results, errors } = await PromisePool.for(rickMortyIds)
      .onTaskStarted((rick, pool) => {
        console.log(`Inicia la busqueda del avatar: ${rick} ......`);
        console.log(`Progreso: ${pool.processedPercentage()}%`);
        console.log(`Tareas procesadas: ${pool.processedItems().length}`);
        console.log(`Tareas activas: ${pool.activeTasksCount()}`);
      })
      .onTaskFinished((rick) => {
        console.log(`...... Finaliza la busqueda del avatar: ${rick}`);
      })
      .withConcurrency(concurrency)
      .process(getRicks);

    console.log('Results: ', results);
    console.log('Errors: ', errors);

    return { errors, results };
  }

  async fetchLimitRickAndMorty(
    userData,
  ): Promise<void | ReadRickAndMortyResponseDto> {
    const { rickMortyIds } = userData;
    const limit = promiseLimit(1);

    Promise.all(
      rickMortyIds.map((rick) => {
        return limit(() => this.retrieveRicks(rick));
      }),
    );
  }

  retrieveRicks = async (rickId: string): Promise<ReadRickAndMortyResponse> => {
    const dateStarted = new Date();
    const millisStart = dateStarted.getMilliseconds();
    const secsStart = dateStarted.getSeconds();
    const minsStart = dateStarted.getMinutes();
    const hourStart = dateStarted.getHours();
    const dayStart = dateStarted.getDay();
    const monthStart = dateStarted.getMonth();
    const yearStart = dateStarted.getFullYear();
    const fullTimeSearchStarted = `${hourStart}:${minsStart}:${secsStart}:${millisStart}`;
    this.logger.debug(`Full time Search started at: ${fullTimeSearchStarted}`);
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
        const end = Date.now();
        const fmtNow = new Date(end);
        const searchFinishedAt = fmtNow.toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        this.logger.debug(`Search finished at: ${searchFinishedAt}`);
        resolve(rickFound);
      }, 5000);
    });
  };
}
