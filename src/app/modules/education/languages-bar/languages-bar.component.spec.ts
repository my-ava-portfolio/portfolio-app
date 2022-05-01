import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesBarComponent } from './languages-bar.component';

describe('LanguagesBarComponent', () => {
  let component: LanguagesBarComponent;
  let fixture: ComponentFixture<LanguagesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagesBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
