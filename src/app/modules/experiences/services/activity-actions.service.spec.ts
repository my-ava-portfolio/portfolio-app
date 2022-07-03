import { TestBed } from '@angular/core/testing';

import { ActivityActionsService } from './activity-actions.service';

describe('ActivityActionsService', () => {
  let service: ActivityActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
