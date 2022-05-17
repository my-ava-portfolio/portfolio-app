import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  timeLineInputs: Subject<any> = new Subject<any>();
  dateUpdated: Subject<string> = new Subject<string>();

  constructor() { }

  pushTimeLineInputs(startDate: Date | null, endDate: Date | null, currentDate: string): void {
    this.timeLineInputs.next({
      startDate: startDate,
      endDate: endDate,
      currentDate: currentDate,
    });
  }

  pushDateUpdated(date: string): void {
    this.dateUpdated.next(date);
  }

}



