import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterbarPresentationComponent } from './centerbar-presentation.component';

describe('CenterbarPresentationComponent', () => {
  let component: CenterbarPresentationComponent;
  let fixture: ComponentFixture<CenterbarPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterbarPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterbarPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
