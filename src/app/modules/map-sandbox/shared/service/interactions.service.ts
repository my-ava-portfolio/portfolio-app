import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  layerIdSelected: Subject<string | null> = new Subject<string | null>();
  selectableLayerId: Subject<string> = new Subject<string>();
  selectableAllLayers: Subject<boolean> = new Subject<boolean>();
  editBarActivation: Subject<boolean> = new Subject<boolean>();
  removeLayers: Subject<boolean> = new Subject<boolean>();
  selectingLayerStatus: Subject<boolean> = new Subject<boolean>();

  constructor(
  ) { }

  removeAllLayers(): void {
    this.removeLayers.next(true)
  }

  sendSelectedLayerId(layerId: string | null): void {
    this.layerIdSelected.next(layerId)
  }

}
