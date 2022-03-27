import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightbarSkillsComponent } from './rightbar-skills.component';

describe('RightbarSkillsComponent', () => {
  let component: RightbarSkillsComponent;
  let fixture: ComponentFixture<RightbarSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightbarSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightbarSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
