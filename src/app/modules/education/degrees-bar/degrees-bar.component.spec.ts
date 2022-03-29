import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreesBarComponent } from './degrees-bar.component';

describe('DegreesBarComponent', () => {
  let component: DegreesBarComponent;
  let fixture: ComponentFixture<DegreesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreesBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
