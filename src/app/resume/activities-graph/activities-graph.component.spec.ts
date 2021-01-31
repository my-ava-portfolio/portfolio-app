import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesGraphComponent } from './activities-graph.component';

describe('ActivitiesGraphComponent', () => {
  let component: ActivitiesGraphComponent;
  let fixture: ComponentFixture<ActivitiesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
