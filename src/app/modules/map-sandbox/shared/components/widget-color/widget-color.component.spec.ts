import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetColorComponent } from './widget-color.component';

describe('WidgetColorComponent', () => {
  let component: WidgetColorComponent;
  let fixture: ComponentFixture<WidgetColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
