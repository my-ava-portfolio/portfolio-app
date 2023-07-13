import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeomIconsComponent } from './geom-icons.component';

describe('GeomIconsComponent', () => {
  let component: GeomIconsComponent;
  let fixture: ComponentFixture<GeomIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GeomIconsComponent]
    });
    fixture = TestBed.createComponent(GeomIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
