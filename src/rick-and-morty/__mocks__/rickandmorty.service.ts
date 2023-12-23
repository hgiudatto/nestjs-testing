/* eslint-disable prettier/prettier */
import { rickAndMortyStub } from '../stubs/rickandmorty.stub';
import { everyRickAndMortyStub } from '../stubs/every-rickandmorty.stub';
import { allRickMortyStub } from '../stubs/allRickMorty.stub';

export const RickAndMortyService = jest.fn().mockReturnValue({
  fetchRickAndMorty: jest.fn().mockResolvedValue(rickAndMortyStub()),
  fetchEveryRickAndMorty: jest.fn().mockResolvedValue(allRickMortyStub()),
});
