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
  RicksAndMortysPromiseAllRefactorResponse,
  RicksAndMortysResponse,
} from 'src/promise-pool/promise-pool.dto';
import getRicks from '../helpers/fetchRickAndMortys';
import { ftruncate } from 'fs';
const promiseLimit = require('promise-limit');

@Injectable()
export class PromiseRickMortyPoolService {
  private readonly logger = new Logger(PromiseRickMortyPoolService.name);

  constructor(private readonly httpService: HttpService) {}

  sleepFetchRickMortys = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

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

    const rickSearches = rickMortyIds.map((rick) => {
      limit(() => this.retrieveRicks(rick));
    });

    const result = await Promise.all(rickSearches);
    this.logger.debug(result);
  }

  async fetchConcurrentRickAndMorty(
    userData,
  ): Promise<void | ReadRickAndMortyResponseDto> {
    const { rickMortyIds } = userData;
    const dateStarted = new Date();
    const millisStart = dateStarted.getMilliseconds();
    const secsStart = dateStarted.getSeconds();
    const minsStart = dateStarted.getMinutes();
    const hourStart = dateStarted.getHours();
    const fullTimeSearchStarted = `${hourStart}:${minsStart}:${secsStart}:${millisStart}`;
    this.logger.debug(`Search started out at: ${fullTimeSearchStarted}`);
    const rickAndMortys = rickMortyIds.map((r) => this.retrieveRicks(r));
    const results = await Promise.all(rickAndMortys);
    const dateFinished = new Date();
    const millisFinish = dateFinished.getMilliseconds();
    const secsFinish = dateFinished.getSeconds();
    const minsFinish = dateFinished.getMinutes();
    const hourFinish = dateFinished.getHours();
    const fullTimeSearchFinished = `${hourFinish}:${minsFinish}:${secsFinish}:${millisFinish}`;
    this.logger.debug(`Search Finished at: ${fullTimeSearchFinished}`);
    results.map((rick) => this.logger.log(JSON.stringify(rick)));
  }

  async fetchSequentialRickAndMorty(
    userData,
  ): Promise<void | ReadRickAndMortyResponseDto> {
    const { rickMortyIds, invoice } = userData;
    const vencStr = String([invoice['vencimiento']]);
    let vencFmt;
    if (vencStr.includes('/')) {
      // vencFmt = vencStr.slice(0, 2) + vencStr.slice(3, vencStr.length);
      // vencFmt = vencStr.replace('/', '');
      vencFmt = vencStr.replace(/[/]/g, '');
    }
    const greetings: string = 'Hello';
    const getFmt: string = greetings + vencFmt;
    rickMortyIds.map(async (rickMorty) => {
      const dateStarted = new Date();
      const millisStart = dateStarted.getMilliseconds();
      const secsStart = dateStarted.getSeconds();
      const minsStart = dateStarted.getMinutes();
      const hourStart = dateStarted.getHours();
      const fullTimeSearchStarted = `${hourStart}:${minsStart}:${secsStart}:${millisStart}`;
      this.logger.debug(
        `Search for rick: ${rickMorty} started out at: ${fullTimeSearchStarted}`,
      );
      const rick = await this.retrieveRicks(rickMorty);
      const dateFinished = new Date();
      const millisFinish = dateFinished.getMilliseconds();
      const secsFinish = dateFinished.getSeconds();
      const minsFinish = dateFinished.getMinutes();
      const hourFinish = dateFinished.getHours();
      const fullTimeSearchFinished = `${hourFinish}:${minsFinish}:${secsFinish}:${millisFinish}`;
      this.logger.debug(`Search Finished at: ${fullTimeSearchFinished}`);
      this.logger.log(JSON.stringify(rick));
    });
  }

  async fetchPromiseAllRefactorRickAndMorty(userData) {
    const { rickMortyIds } = userData;
    const goodRicks = [];

    const getSearchedRicks = async (rickMorty) => {
      this.sleepFetchRickMortys(3000);
      return new Promise(async (resolve, reject) => {
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

    rickMortyIds.map(async (rickMorty) => {
      await getSearchedRicks(rickMorty);
    });

    return { goodRicks };
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
}
