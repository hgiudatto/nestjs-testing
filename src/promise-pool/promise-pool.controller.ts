import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PromiseRickMortyPoolService } from './promise-pool.service';
import {
  ReadRickAndMortyResponseDto,
  RicksAndMortysPromiseAllRefactorResponse,
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

  @HttpCode(HttpStatus.OK)
  @Post('retrieve_concurrent_rickMortys')
  async getConcurrentRickMortys(
    @Body() userData,
  ): Promise<void | ReadRickAndMortyResponseDto> {
    return await this.pooledRickMortyService.fetchConcurrentRickAndMorty(
      userData,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('retrieve_sequential_rickMortys')
  async getSequentialRickMortys(
    @Body() userData,
  ): Promise<void | ReadRickAndMortyResponseDto> {
    return await this.pooledRickMortyService.fetchSequentialRickAndMorty(
      userData,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('retrieve_promiseAllRefactor_rickMortys')
  async getPormiseAllRefactorRickAndMorty(
    @Body() userData,
  ): Promise<RicksAndMortysPromiseAllRefactorResponse> {
    return await this.pooledRickMortyService.fetchPromiseAllRefactorRickAndMorty(
      userData,
    );
  }
}
