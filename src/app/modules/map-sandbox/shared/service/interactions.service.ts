import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { layerHandler } from '../core';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  currentSelectedLayerId: Subject<string> = new Subject<string>();
  currentSelectedLayer: Subject<layerHandler | null> = new Subject<layerHandler | null>();

  layerLockStatus: Subject<boolean> = new Subject<boolean>();
  removeLayers: Subject<boolean> = new Subject<boolean>();
  selectingLayerStatus: Subject<boolean> = new Subject<boolean>();

  constructor(
  ) { }

  setLayerLockStatus(event: boolean): void {
    this.layerLockStatus.next(event);
  }

  removeAllLayers(): void {
    this.removeLayers.next(true)
  }

  setSelectingLayers(isEnabled: boolean): void {
    this.selectingLayerStatus.next(isEnabled)
  }

  sendSelectedLayerId(layerId: string): void {
    this.currentSelectedLayerId.next(layerId)
  }
  sendSelectedLayer(layer: layerHandler |null): void {
    this.currentSelectedLayer.next(layer)
  }
}
