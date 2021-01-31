import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterBarNavigationComponent } from './centerbar-navigation.component';

describe('ActivitiesGraphComponent', () => {
  let component: CenterBarNavigationComponent;
  let fixture: ComponentFixture<CenterBarNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterBarNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterBarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
