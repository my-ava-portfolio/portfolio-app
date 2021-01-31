import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterbarProjectsComponent } from './centerbar-projects.component';

describe('CenterbarProjectsComponent', () => {
  let component: CenterbarProjectsComponent;
  let fixture: ComponentFixture<CenterbarProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterbarProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterbarProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
