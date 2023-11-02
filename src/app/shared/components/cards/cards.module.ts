import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CardsComponent],
  imports: [CommonModule, MatCardModule, MatIconModule],
  exports: [CardsComponent]
})
export class CardsModule {}
