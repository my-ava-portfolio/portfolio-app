import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityActionsService {

  activityId: Subject<string> = new Subject<string>();

  constructor() { }

  setActivity(nameId: string) {
    this.activityId.next(nameId)
  }

}
