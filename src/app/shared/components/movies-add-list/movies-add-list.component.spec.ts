import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesAddListComponent } from './movies-add-list.component';

describe('MoviesAddListComponent', () => {
  let component: MoviesAddListComponent;
  let fixture: ComponentFixture<MoviesAddListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesAddListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
