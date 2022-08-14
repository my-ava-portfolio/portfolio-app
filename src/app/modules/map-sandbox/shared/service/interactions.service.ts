import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  layerLockStatus: Subject<boolean> = new Subject<boolean>();
  removeLayers: Subject<boolean> = new Subject<boolean>();

  constructor(
  ) { }

  setLayerLockStatus(event: boolean): void {
    this.layerLockStatus.next(event);
  }

  removeAllLayers(): void {
    this.removeLayers.next(true)
  }

}
