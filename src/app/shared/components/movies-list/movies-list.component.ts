import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { MoviesList } from 'src/app/core/interfaces/movies-list.interface';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {

  @Input() moviesList: MoviesList[] = [];
  
}
