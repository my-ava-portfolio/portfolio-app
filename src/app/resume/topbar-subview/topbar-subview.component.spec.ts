import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarSubviewComponent } from './topbar-subview.component';

describe('TopbarSubviewComponent', () => {
  let component: TopbarSubviewComponent;
  let fixture: ComponentFixture<TopbarSubviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarSubviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarSubviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
