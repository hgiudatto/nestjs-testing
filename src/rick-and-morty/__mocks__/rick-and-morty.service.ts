import { rickAndMortyStub } from '../stubs/rickandmorty.stub';

export const RickAndMortyService = jest.fn().mockReturnValue({
  fetchRickAndMorty: jest.fn().mockResolvedValue(rickAndMortyStub()),
});
