import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterbarVolunteerComponent } from './centerbar-volunteer.component';

describe('CenterbarVolunteerComponent', () => {
  let component: CenterbarVolunteerComponent;
  let fixture: ComponentFixture<CenterbarVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterbarVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterbarVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
