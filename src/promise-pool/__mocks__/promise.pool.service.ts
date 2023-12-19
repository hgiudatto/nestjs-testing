/* eslint-disable prettier/prettier */
import { rickAndMortyPromiseAllRefactorStub } from 'src/rick-and-morty/stubs/rickandmortyPromiseAllRefactor.stub';

export const PromiseRickMortyPoolService = jest.fn().mockReturnValue({
  fetchPromiseAllRefactorRickAndMorty: jest
    .fn()
    .mockReturnValue(rickAndMortyPromiseAllRefactorStub),
});
