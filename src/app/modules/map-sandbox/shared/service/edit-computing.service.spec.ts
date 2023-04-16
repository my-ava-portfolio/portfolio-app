import { TestBed } from '@angular/core/testing';

import { EditComputingService } from './edit-computing.service';

describe('EditComputingService', () => {
  let service: EditComputingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditComputingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
