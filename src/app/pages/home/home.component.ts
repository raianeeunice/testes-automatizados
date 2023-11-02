import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoviesList } from 'src/app/core/interfaces/movies-list.interface';
import { MoviesAddListComponent } from 'src/app/shared/components/movies-add-list/movies-add-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, DoCheck {
  movie: MoviesList | null = null;
  constructor(private dialog: MatDialog) {}

  public taskList: Array<MoviesList> = JSON.parse(
    localStorage.getItem('list') || '[]'
  );

  ngDoCheck() {
    this.setLocalStorage();
  }

  ngOnInit(): void {}

  openAddMovieModal() {
    const dialogRef = this.dialog.open(MoviesAddListComponent, {
      data: this.movie,
      minWidth: 500,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.movie = result;
        return;
      }
    });
  }

  public setEmitTaskList(event: MoviesList) {
    return this.taskList.push(event);
  }

  public deleteItemTaskList(event: number) {
    return this.taskList.splice(event, 1);
  }

  public deleteAllTaskList() {
    const confirm = window.confirm('Tem certeza que deseja Deletar tudo?');

    if (confirm) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm('Task está vazia, deseja deletar?');

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage() {
    if (this.taskList) {
      //this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }
}
