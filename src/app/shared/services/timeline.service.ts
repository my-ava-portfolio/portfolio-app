import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  timeLineInputs: Subject<any> = new Subject<any>();
  dateUpdated: Subject<string> = new Subject<string>();
  defaultSpeedValue: Subject<number> = new Subject<number>();
  updatedSpeedValue: Subject<number> = new Subject<number>();

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

  pushDefaultSpeedValue(value: number): void {
    this.defaultSpeedValue.next(value);
  }

  pushUpdatedSpeedValue(value: number): void {
    this.updatedSpeedValue.next(value);
  }
}



