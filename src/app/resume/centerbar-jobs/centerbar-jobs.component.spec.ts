import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterbarJobsComponent } from './centerbar-jobs.component';

describe('CenterbarJobsComponent', () => {
  let component: CenterbarJobsComponent;
  let fixture: ComponentFixture<CenterbarJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterbarJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterbarJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
