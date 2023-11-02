import { MoviesType } from '../enums/movies-type.enum';

export interface MoviesList {
  duration: Date;
  title: string;
  type: string;
  year: Date;
  streaming: string;
}
