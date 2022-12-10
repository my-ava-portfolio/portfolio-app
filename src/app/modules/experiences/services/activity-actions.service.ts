import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityActionsService {

  activityId: Subject<string> = new Subject<string>();
  activityParameters: Subject<any> = new Subject<any>();

  constructor() { }


  setActivity(nameId: string) {
    this.activityId.next(nameId)
  }

  setActivityParameters(parameters: any) {
    this.activityParameters.next(parameters)
  }

}
