/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PromisePoolController } from './promise-pool.controller';
import { PromiseRickMortyPoolService } from './promise-pool.service';

@Module({
  imports: [HttpModule],
  providers: [PromiseRickMortyPoolService],
  controllers: [PromisePoolController],
})
export class PromisePoolModule {}
