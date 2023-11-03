/* eslint-disable prettier/prettier */
import { InjectQueue } from '@nestjs/bull';
import { Body, Inject, Injectable, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { Logger } from '@nestjs/common';
import { TRANSCODE_QUEUE } from './constants';
import { RequestService } from './request.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { FreezePipe } from './pipes/freeze.pipe';
import axios from 'axios';
import { response } from 'express';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    readonly requestService: RequestService,
    @InjectQueue(TRANSCODE_QUEUE) private readonly transcodeQueue: Queue,
  ) {}

  async getHello() {
    const response = await axios
      .get('https://rickandmortyapi.com/api/')
      .then((resp) => resp.data);
    /*  await this.cacheManager.set('cached_item', { key: 32 });
    await this.cacheManager.del('cached_item');
    await this.cacheManager.reset();
    const cachedItem = await this.cacheManager.get('cached_item'); */
    console.log('From API');
    // const userId = this.requestService.getUserId();
    // this.logger.log('getHello userId: ', userId);
    return response;
  }

  /* async transcode() {
    await this.transcodeQueue.add({ fileName: './file.mp3' });
  } */
}
