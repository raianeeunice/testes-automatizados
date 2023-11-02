import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesSearchComponent } from './movies-search.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [MoviesSearchComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [MoviesSearchComponent],
})
export class MoviesSearchModule {}
