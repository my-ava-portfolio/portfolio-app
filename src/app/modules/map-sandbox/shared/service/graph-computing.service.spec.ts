import { TestBed } from '@angular/core/testing';

import { GraphComputingService } from './graph-computing.service';

describe('GraphComputingService', () => {
  let service: GraphComputingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphComputingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
