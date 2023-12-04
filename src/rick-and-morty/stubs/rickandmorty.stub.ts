/* eslint-disable prettier/prettier */
import { RickAndMorty } from 'src/dto/RickAndMorty.dto';

export const rickAndMortyStub = (): RickAndMorty => {
  let rickandmorty: RickAndMorty = {
    id: '10',
    name: 'Alan Rails',
    status: 'Dead',
    species: 'Human',
    type: 'Superhuman (Ghost trains summoner)',
    gender: 'Male',
    origin: {
      name: 'unknown',
      url: '',
    },
    location: {
      name: "Worldender's lair",
      url: 'https://rickandmortyapi.com/api/location/4',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/25'],
    url: 'https://rickandmortyapi.com/api/character/10',
    created: '2017-11-04T20:19:09.017Z',
  };
  return rickandmorty;
};
