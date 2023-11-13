import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PromiseRickMortyPoolService } from './promise-pool.service';
import { ReadRickAndMortyResponseDto } from 'src/promise-pool/promise-pool.dto';

@Controller('promise-pool')
export class PromisePoolController {
  constructor(
    private readonly pooledRickMortyService: PromiseRickMortyPoolService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('retrieve_pooled_rickMortys')
  async getPooledRickMortys(
    @Body() userData,
  ): Promise<void | ReadRickAndMortyResponseDto> {
    return await this.pooledRickMortyService.fetchPooledRickAndMorty(userData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('retrieve_limited_rickMortys')
  async getLimitedRickMortys(
    @Body() userData,
  ): Promise<void | ReadRickAndMortyResponseDto> {
    return await this.pooledRickMortyService.fetchLimitRickAndMorty(userData);
  }
}
