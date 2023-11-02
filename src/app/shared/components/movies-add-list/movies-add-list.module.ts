import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MoviesAddListComponent } from './movies-add-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [MoviesAddListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule
  ],
  exports: [MoviesAddListComponent],
})
export class MoviesAddListModule {}
