import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoinfoComponent } from './geoinfo.component';

describe('GeoinfoComponent', () => {
  let component: GeoinfoComponent;
  let fixture: ComponentFixture<GeoinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
