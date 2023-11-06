import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoviesAddListComponent } from 'src/app/shared/components/movies-add-list/movies-add-list.component';
import { MoviesList } from 'src/app/core/interfaces/movies-list.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements DoCheck, OnDestroy {
  constructor(private dialog: MatDialog) {}

  private setMoviesList: Array<MoviesList> = JSON.parse(
    localStorage.getItem('list') || '[]'
  );
  public getAllMovies = this.setMoviesList;

  ngDoCheck() {
    this.setLocalStorage();
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  private addMovieList(movie: MoviesList): void {
    this.getAllMovies.unshift(movie);
  }

  private editMovieList(event: MoviesList, index: number): void {
    console.log(event);
    this.getAllMovies[index] = event;
  }

  public deleteAllMovieList() {
    this.getAllMovies = [];
  }

  public deleteMovieList(event: number) {
    this.getAllMovies.splice(event, 1);
  }

  public getSearch(value: string) {
    const filter = this.setMoviesList.filter((res: MoviesList) => {
      const title = res.title.toLocaleLowerCase();
      return title.includes(value.toLowerCase());
    });

    this.getAllMovies = filter;
  }

  public setLocalStorage() {
    if (this.setMoviesList) {
      localStorage.setItem('list', JSON.stringify(this.setMoviesList));
    }
  }

  public openAddMovieModal(
    edit: boolean,
    index?: number,
    movieEvent?: MoviesList
  ): void {
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
          this.addMovieList(result);
          return;
        }

        if (index !== undefined && index >= 0) {
          this.editMovieList(result, index);
        }
      }
    });
  }
}
