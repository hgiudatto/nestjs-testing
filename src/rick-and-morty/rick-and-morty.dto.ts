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
  rickMortyId?: string;
  rickMortyIds?: Array<number>;
}
