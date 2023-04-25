import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersManagerComponent } from './layers-manager.component';

describe('LayersManagerComponent', () => {
  let component: LayersManagerComponent;
  let fixture: ComponentFixture<LayersManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayersManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
