import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeContentComponent } from './badge-content.component';

describe('BadgeContentComponent', () => {
  let component: BadgeContentComponent;
  let fixture: ComponentFixture<BadgeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
