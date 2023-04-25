import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { layerHandler } from '../layer-handler/layer-handler';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  layerIdSelected: Subject<string | null> = new Subject<string | null>();
  allLayers: Subject<layerHandler[]> = new Subject<layerHandler[]>();
  removeLayers: Subject<boolean> = new Subject<boolean>();
  
  constructor(
  ) { }

  sendAllLayers(layers: layerHandler[]): void {
    this.allLayers.next(layers)
  }

  removeAllLayers(): void {
    this.removeLayers.next(true)
  }

  sendSelectedLayerId(layerId: string | null): void {
    this.layerIdSelected.next(layerId)
  }

}
