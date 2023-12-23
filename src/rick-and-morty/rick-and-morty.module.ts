import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RickAndMortyService } from './rickandmorty.service';

@Module({
  imports: [HttpModule],
  providers: [RickAndMortyService],
})
export class RickAndMortyModule {}
