import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterbarPublicationsComponent } from './centerbar-publications.component';

describe('CenterbarPublicationsComponent', () => {
  let component: CenterbarPublicationsComponent;
  let fixture: ComponentFixture<CenterbarPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterbarPublicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterbarPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
