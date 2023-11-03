import {
  Controller,
  Body,
  Get,
  Post,
  UseInterceptors,
  UseGuards,
  UseFilters,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { FreezePipe } from './pipes/freeze.pipe';
import { throwError } from 'rxjs';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @Get('error')
  @UseInterceptors(LoggingInterceptor)
  throwError() {
    throw new InternalServerErrorException();
  }

  @Post()
  @UseInterceptors(LoggingInterceptor, CacheInterceptor)
  @UseGuards(FreezePipe)
  examplePost(@Body(new FreezePipe()) body: any) {
    body.test = 32;
  }

  /* @Post('transcode')
  async transcode() {
    return this.appService.transcode();
  } */
}
