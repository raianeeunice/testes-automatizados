import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list.component';
import { CardsModule } from '../cards/cards.module';



@NgModule({
  declarations: [
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    CardsModule
  ]
})
export class MoviesListModule { }
