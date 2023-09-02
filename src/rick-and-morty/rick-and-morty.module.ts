import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RickAndMortyService } from './rick-and-morty.service';

@Module({
  imports: [HttpModule],
  providers: [RickAndMortyService],
})
export class RickAndMortyModule {}
