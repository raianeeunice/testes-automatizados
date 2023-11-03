import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoviesList } from 'src/app/core/interfaces/movies-list.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() movie: MoviesList | null = null;
  @Output() public emitDeleteMovie: EventEmitter<void> = new EventEmitter();
  @Output() public emitEditMovie: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
