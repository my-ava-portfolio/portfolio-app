import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  layerLockStatus: Subject<boolean> = new Subject<boolean>();

  constructor(
  ) { }

  setLayerLockStatus(event: boolean): void {
    this.layerLockStatus.next(event);
  }

}
