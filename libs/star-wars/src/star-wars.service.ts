import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StarWarsService {
  async getMovies(): Promise<any> {
    const response = await axios.get('URL_DE_LA_API_DE_STAR_WARS/movies');
    return response.data;
  }

  // Agrega otros métodos según tus necesidades
}
