import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoviesList } from 'src/app/core/interfaces/movies-list.interface';
import { SelectOption } from 'src/app/core/interfaces/selection-options.interface';

@Component({
  selector: 'app-movies-add-list',
  templateUrl: './movies-add-list.component.html',
  styleUrls: ['./movies-add-list.component.scss'],
})
export class MoviesAddListComponent implements OnInit {
  _form: FormGroup;
  year: number = new Date().getFullYear();
  typeMovieOptions: SelectOption[] = [
    { label: 'Ação', value: 'acao' },
    { label: 'Aventura', value: 'aventura' },
    { label: 'Comedia', value: 'comedia' },
    { label: 'Drama', value: 'drama' },
    { label: 'Fantasia', value: 'fantasia' },
    { label: 'Romance', value: 'romance' },
    { label: 'Terror', value: 'terror' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MoviesList,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MoviesAddListComponent>
  ) {
    this._form = this.formBuilder.group({
      duration: this.formBuilder.control(null, Validators.required),
      title: this.formBuilder.control(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
      ]),
      type: this.formBuilder.control(null, Validators.required),
      year: this.formBuilder.control(1900, [
        Validators.required,
        Validators.min(1900),
        Validators.max(this.year),
      ]),
      streaming: this.formBuilder.control(null, Validators.required),
    });
  }

  ngOnInit(): void {
    const { data } = this;

    if (!!data) {
      this.changeFields(data);
    }
  }

  ngOnDestroy(): void {
    this._form.reset();
  }

  private changeFields(data: MoviesList) {
    this._form.patchValue(data);
  }

  private highlightInvalidFields(form: FormGroup) {
    const invalidControls = Object.keys(form.controls).filter(
      (controlName) => form.get(controlName)?.invalid
    );

    if (invalidControls.length > 0) {
      invalidControls.forEach((controlName) => {
        form.get(controlName)?.markAsTouched();
        form.get(controlName)?.markAsDirty();
        form.get(controlName)?.updateValueAndValidity();
      });
    }
  }

  public clear() {
    this._form.reset();
    this.dialogRef.close('limpar');
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onAddMovie() {
    if (this._form.invalid) {
      this.highlightInvalidFields(this._form);
      return;
    }

    const movie = this._form.getRawValue();
    this.dialogRef.close(movie);
  }
}
