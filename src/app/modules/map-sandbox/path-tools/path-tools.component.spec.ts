import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathToolsComponent } from './path-tools.component';

describe('PathToolsComponent', () => {
  let component: PathToolsComponent;
  let fixture: ComponentFixture<PathToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
