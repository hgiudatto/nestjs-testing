/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { ReadRickAndMortyResponse } from './dto/sequential-ricks.dto';

@Injectable()
export class SequentialRicksService {
  private readonly logger = new Logger(SequentialRicksService.name);

  constructor(private readonly httpService: HttpService) {}

  sleepFetchRickMortys = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  async fetchAllSequentialRickAndMorty(userData) {
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
