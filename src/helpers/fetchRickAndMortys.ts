/* eslint-disable prettier/prettier */
import axios, { Axios, AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { ReadRickAndMortyResponse } from 'src/rick-and-morty/rick-and-morty.dto';

/* eslint-disable @typescript-eslint/no-unused-vars */
const getRicks = async (rickId: string): Promise<ReadRickAndMortyResponse> => {
  try {
    let rickFound: ReadRickAndMortyResponse = new ReadRickAndMortyResponse();
    setTimeout(async () => {
      const { data, status } = await axios.get<ReadRickAndMortyResponse>(
        `https://rickandmortyapi.com/api/character/${rickId}`,
        { headers: { Accept: 'applicatio/json' } },
      );

      console.log(JSON.stringify(data));
      console.log('Response status is: ', status);
      rickFound = data;
    }, 3000);

    return rickFound;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Error message: ', error.message);
    } else {
      console.log('Unexpected error: ', error);
    }
  }
};

export default getRicks;
