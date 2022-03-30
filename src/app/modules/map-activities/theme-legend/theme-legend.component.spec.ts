import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeLegendComponent } from './theme-legend.component';

describe('ThemeLegendComponent', () => {
  let component: ThemeLegendComponent;
  let fixture: ComponentFixture<ThemeLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
