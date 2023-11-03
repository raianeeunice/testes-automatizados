import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MoviesSearchModule } from '../shared/components/movies-search/movies-search.module';
import { CardsModule } from '../shared/components/cards/cards.module';
import { MoviesAddListModule } from '../shared/components/movies-add-list/movies-add-list.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MoviesSearchModule,
    CardsModule,
    MoviesAddListModule,
  ],
})
export class PagesModule {}
