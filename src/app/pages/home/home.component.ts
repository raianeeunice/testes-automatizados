import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoviesList } from 'src/app/core/interfaces/movies-list.interface';
import { MoviesAddListComponent } from 'src/app/shared/components/movies-add-list/movies-add-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements DoCheck, OnDestroy {
  constructor(private dialog: MatDialog) {}

  public moviesList: Array<MoviesList> = JSON.parse(
    localStorage.getItem('list') || '[]'
  );

  ngDoCheck() {
    this.setLocalStorage();
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  openAddMovieModal(edit: boolean, index?: number, movieEvent?: MoviesList) {
    let movie = null;

    if (movieEvent) {
      movie = movieEvent;
    }
    const dialogRef = this.dialog.open(MoviesAddListComponent, {
      data: movie,
      minWidth: 500,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!edit) {
          this.setMovieList(result);
          return;
        }

        if (index !== undefined && index >= 0) {
          this.editMovieList(result, index);
        }
      }
    });
  }

  private editMovieList(event: MoviesList, index: number) {
    console.log(event);
    this.moviesList[index] = event;
  }

  public setMovieList(movie: MoviesList) {
    this.moviesList.unshift(movie);
  }

  public deleteMovieList(event: number) {
    this.moviesList.splice(event, 1);
  }

  public deleteAllMovieList() {
    this.moviesList = [];
  }

  public setLocalStorage() {
    if (this.moviesList) {
      localStorage.setItem('list', JSON.stringify(this.moviesList));
    }
  }
}
