import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PromiseRickMortyPoolService } from './promise-pool.service';
import {
  ReadRickAndMortyRequestDto,
  ReadRickAndMortyResponseDto,
} from 'src/promise-pool/promise-pool.dto';

@Controller('promise-pool')
export class PromisePoolController {
  constructor(
    private readonly pooledRickMortyService: PromiseRickMortyPoolService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('retrieve_pooled_rickMortys')
  async getPooledRickMortys(
    @Body() userData,
  ): Promise<ReadRickAndMortyResponseDto> {
    return await this.pooledRickMortyService.fetchPooledRickAndMorty(userData);
  }
}
