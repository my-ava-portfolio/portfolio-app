import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortViewComponent } from './short-view.component';

describe('ShortViewComponent', () => {
  let component: ShortViewComponent;
  let fixture: ComponentFixture<ShortViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
