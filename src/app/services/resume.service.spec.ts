/* tslint:disable:no-unused-variable */

import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResumeService } from './resume.service';

describe('Service: ResumeService', () => {
	let service: ResumeService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ResumeService]
    });
    service = TestBed.inject(ResumeService);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should have pullActivityIdToPreselectNodeGraph function', inject([ResumeService], (service: ResumeService) => {
    service.activityId.subscribe((res) => {
      expect(res).toEqual('siemens');
    });
    service.pullActivityIdToPreselectNodeGraph('siemens')


  }));
});
