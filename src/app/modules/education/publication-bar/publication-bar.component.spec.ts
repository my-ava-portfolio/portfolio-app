import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationBarComponent } from './publication-bar.component';

describe('PublicationBarComponent', () => {
  let component: PublicationBarComponent;
  let fixture: ComponentFixture<PublicationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
