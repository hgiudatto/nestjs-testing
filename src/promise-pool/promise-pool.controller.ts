import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PromiseRickMortyPoolService } from './promise-pool.service';
import { ReadRickAndMortyRequestDto } from 'src/rick-and-morty/rick-and-morty.dto';

@Controller('promise-pool')
export class PromisePoolController {
  constructor(
    private readonly pooledRickMortyService: PromiseRickMortyPoolService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('retrieve_pooled_rickMortys')
  async getPooledRickMortys(
    @Body() userData: ReadRickAndMortyRequestDto,
  ): Promise<Response | void> {
    return await this.pooledRickMortyService.fetchPooledRickAndMorty(userData);
  }
}
