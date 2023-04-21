import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { layerHandler } from '../layer-handler/layer-handler';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  layerIdSelected: Subject<string | null> = new Subject<string | null>();
  layerObjectSelected: Subject<layerHandler | null> = new Subject<layerHandler | null>();
  selectableLayerId: Subject<string> = new Subject<string>();
  selectableAllLayers: Subject<boolean> = new Subject<boolean>();
  editBarActivation: Subject<boolean> = new Subject<boolean>();
  removeLayers: Subject<boolean> = new Subject<boolean>();
  selectingLayerStatus: Subject<boolean> = new Subject<boolean>();

  constructor(
  ) { }

  activateEditBar(event: boolean): void {
    this.editBarActivation.next(event);
  }

  removeAllLayers(): void {
    this.removeLayers.next(true)
  }

  setSelectingLayers(isEnabled: boolean): void {
    this.selectingLayerStatus.next(isEnabled)
  }
  setSelectableLayer(layerId: string): void {
    this.selectableLayerId.next(layerId)
  }
  setSelectableAllLayers(): void {
    this.selectableAllLayers.next(true)
  }

  sendSelectedLayerId(layerId: string | null): void {
    this.layerIdSelected.next(layerId)
  }
  sendSelectedLayer(layer: layerHandler | null): void {
    this.layerObjectSelected.next(layer)
  }
}
