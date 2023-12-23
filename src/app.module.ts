/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { RickandmortyController } from './rick-and-morty/rickandmorty.controller';
import { AppService } from './app.service';
import { RickAndMortyService } from './rick-and-morty/rickandmorty.service';
import { RickAndMortyModule } from './rick-and-morty/rick-and-morty.module';
import { HttpModule } from '@nestjs/axios';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { BullModule } from '@nestjs/bull';
import { TRANSCODE_QUEUE } from './constants';
import { TranscodeConsumer } from './transcode.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as redisStore from 'cache-manager-redis-store';
// import { APP_GUARD } from '@nestjs/core';
import { PromisePoolModule } from './promise-pool/promise-pool.module';

@Module({
  imports: [
    HttpModule,
    RickAndMortyModule,
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({ name: TRANSCODE_QUEUE }),
    CacheModule.register({
      ttl: 60000,
      redisStore,
      host: 'localhost',
      port: 6379,
    }),
    PromisePoolModule,
  ],
  controllers: [AppController, RickandmortyController],
  providers: [
    AppService,
    RequestService,
    RickAndMortyService,
    TranscodeConsumer,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
/* export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
} */
