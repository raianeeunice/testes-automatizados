import { MoviesType } from '../enums/movies-type.enum';

export interface MovieCard {
  duration: string;
  title: string;
  type: string;
  year: string;
  streaming: string;
}
