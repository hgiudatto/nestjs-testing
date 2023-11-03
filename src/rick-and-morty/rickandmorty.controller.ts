import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RickAndMortyService } from './rick-and-morty.service';
import {
  ReadRickAndMortyResponse,
  ReadRickAndMortyRequestDto,
} from './rick-and-morty.dto';

@Controller('rickandmorty')
export class RickandmortyController {
  constructor(private readonly rickAndMortyService: RickAndMortyService) {}

  @HttpCode(HttpStatus.OK)
  @Post('retrieve_rickMortys')
  async getRickMorty(
    @Body() userData: ReadRickAndMortyRequestDto,
  ): Promise<Response | void> {
    return await this.rickAndMortyService.fetchRickAndMorty(userData);
  }
}
