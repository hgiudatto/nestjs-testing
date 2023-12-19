/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SequentialRicksService } from './sequential-ricks.service';
import { RicksAndMortysPromiseAllRefactorResponse } from './dto/sequential-ricks.dto';

@Controller('sequential-ricks')
export class SequentialRicksController {
  constructor(private readonly sequentialRickService: SequentialRicksService) {}

  @HttpCode(HttpStatus.OK)
  @Post('retrieve_oneatatime_rickMortys')
  async getSequentialRickAndMorty(
    @Body() userData,
  ): Promise<RicksAndMortysPromiseAllRefactorResponse> {
    return await this.sequentialRickService.fetchAllSequentialRickAndMorty(
      userData,
    );
  }
}
