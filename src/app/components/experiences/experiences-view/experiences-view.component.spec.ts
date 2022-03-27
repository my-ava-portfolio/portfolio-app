import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesViewComponent } from './experiences-view.component';

describe('ExperiencesViewComponent', () => {
  let component: ExperiencesViewComponent;
  let fixture: ComponentFixture<ExperiencesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
