import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationBarComponent } from './presentation-bar.component';

describe('PresentationBarComponent', () => {
  let component: PresentationBarComponent;
  let fixture: ComponentFixture<PresentationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
