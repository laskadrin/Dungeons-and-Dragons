import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNameEditComponent } from './display-name-edit.component';

describe('DisplayNameEditComponent', () => {
  let component: DisplayNameEditComponent;
  let fixture: ComponentFixture<DisplayNameEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayNameEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
