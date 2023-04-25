import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoToolsComponent } from './geo-tools.component';

describe('GeoToolsComponent', () => {
  let component: GeoToolsComponent;
  let fixture: ComponentFixture<GeoToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
