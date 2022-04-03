import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsBarComponent } from './trainings-bar.component';

describe('TrainingsBarComponent', () => {
  let component: TrainingsBarComponent;
  let fixture: ComponentFixture<TrainingsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
