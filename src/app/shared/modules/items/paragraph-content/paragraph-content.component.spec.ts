import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphContentComponent } from './paragraph-content.component';

describe('ParagraphContentComponent', () => {
  let component: ParagraphContentComponent;
  let fixture: ComponentFixture<ParagraphContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
