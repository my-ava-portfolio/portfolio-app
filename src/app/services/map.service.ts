import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapContainer: Subject<any> = new Subject<any>();
  mapContainerScale: Subject<any> = new Subject<any>();
  interactionsEnabled: Subject<boolean> = new Subject<boolean>();
  layerNameToRemove: Subject<string> = new Subject<string>();
  layerNameToZoom: Subject<any[]> = new Subject<any[]>();

  mapContainerCalled: Subject<boolean> = new Subject<boolean>();
  mapContainerLegendCalled: Subject<boolean> = new Subject<boolean>();
  isMapViewReset: Subject<boolean> = new Subject<boolean>();

  // TODO create a dedicated service
  newPointsSvgLayerName: Subject<string> = new Subject<string>();
  removePointsSvgLayerName: Subject<string> = new Subject<string>();
  newLinesSvgLayerName: Subject<string> = new Subject<string>();
  removeLinesSvgLayerName: Subject<string> = new Subject<string>();
  //

  screenMapBound: Subject<any> = new Subject<any>();

  newCoords: Subject<number[]> = new Subject<number[]>();

  zoomEvent: Subject<boolean> = new Subject<boolean>();

  mapInteraction: Subject<boolean> = new Subject<boolean>();

  constructor(
  ) { }

  getMapContainer(): void {
    this.mapContainerCalled.next(true);
  }

  getMapContainerForLegend(): void {
    this.mapContainerLegendCalled.next(true);
  }

  resetMapView(): void {
    // TODO add argument to control it
    this.isMapViewReset.next(true)
  }

  removeLayerByName(layerName: string): void {
    this.layerNameToRemove.next(layerName)
  }

  sendMapContainer(mapContainer: any): void {
    this.mapContainer.next(mapContainer);
  }

  setMapInteraction(enabled: boolean): void {
    this.interactionsEnabled.next(enabled);
  }

  sendScreenMapBounds(coordsBound: number[]): void {
    this.screenMapBound.next(coordsBound);
  }

  zoomToLayerName(layerName: string, zoom: number): void {
    this.layerNameToZoom.next([layerName, zoom]);
  }

  sendMapScale(scaleFeatures: any): void {
    this.mapContainerScale.next(scaleFeatures);
  }

  // TODO create a dedicated service
  pullPointsSvgLayerName(layerName: string): void {
    this.newPointsSvgLayerName.next(layerName);
  }
  pullRemovePointsSvgLayerName(layerName: string): void {
    this.removePointsSvgLayerName.next(layerName);
  }
  pullLinesSvgLayerName(layerName: string): void {
    this.newLinesSvgLayerName.next(layerName);
  }
  pullRemoveLinesSvgLayerName(layerName: string): void {
    this.removeLinesSvgLayerName.next(layerName);
  }
  //

  pullMapCoords(coordinates: number[]): void {
    this.newCoords.next(coordinates);
  }

  sendZoomAction(): void {
    this.zoomEvent.next(true);
  }

  MapInteraction(status: boolean): void {
    this.mapInteraction.next(status);
  }

}


