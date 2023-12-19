import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SequentialRicksController } from './sequential-ricks.controller';
import { SequentialRicksService } from './sequential-ricks.service';

@Module({
  imports: [HttpModule],
  providers: [SequentialRicksService],
  controllers: [SequentialRicksController],
})
export class SequentialRicksModule {}
