/* eslint-disable prettier/prettier */
export class ReadRickAndMortyResponse {
  created: string;
  episode: Array<any>;
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

export class ReadRickAndMortyRequestDto {
  rickMortyIds: string[];
}

export class ReadRickAndMortyResponseDto {
  results: unknown[];

  errors: unknown[];
}

export class RicksAndMortysResponse {
  ricksAndMortys: ReadRickAndMortyResponse[];
}
