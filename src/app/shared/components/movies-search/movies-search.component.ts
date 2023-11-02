import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.scss']
})
export class MoviesSearchComponent implements OnInit {

  @Output() public emitSearch: EventEmitter<string> = new EventEmitter();
  @Output() public emitAddMovie: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public search(value: string){
    this.emitSearch.emit(value);
  }

}
