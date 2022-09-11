import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAppLayoutComponent } from '@modules/maps/map-app-layout/app-app-layout.component';

describe('MapAppLayoutComponent', () => {
  let component: MapAppLayoutComponent;
  let fixture: ComponentFixture<MapAppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapAppLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
