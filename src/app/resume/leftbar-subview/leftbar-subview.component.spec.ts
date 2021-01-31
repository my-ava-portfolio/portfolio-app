import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftbarSubviewComponent } from './leftbar-subview.component';

describe('LeftbarSubviewComponent', () => {
  let component: LeftbarSubviewComponent;
  let fixture: ComponentFixture<LeftbarSubviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftbarSubviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftbarSubviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
