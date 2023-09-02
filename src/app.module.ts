import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { RickandmortyModule } from './rickandmorty/rickandmorty.module';
import { RickAndMortyModule } from './rick-and-morty/rick-and-morty.module';

@Module({
  imports: [TweetsModule, RickandmortyModule, RickAndMortyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
