import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportToolsComponent } from './import-tools.component';

describe('ImportToolsComponent', () => {
  let component: ImportToolsComponent;
  let fixture: ComponentFixture<ImportToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
