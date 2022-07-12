import { Injectable } from '@angular/core';
import { Extent } from 'ol/extent';
import Map from 'ol/Map';

import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  setmapEvent: Subject<string> = new Subject<string>();
  unsetmapEvent: Subject<string> = new Subject<string>();

  setMapControl: Subject<string> = new Subject<string>();
  unsetMapControl: Subject<string> = new Subject<string>();

  map: Subject<Map> = new Subject<Map>();
  setMapScaleDiv: Subject<any> = new Subject<any>();
  rmvMapScale: Subject<any> = new Subject<any>();
  interactionsEnabled: Subject<boolean> = new Subject<boolean>();
  layerNameToRemove: Subject<string> = new Subject<string>();
  layerNameToZoom: Subject<any[]> = new Subject<any[]>();
  extentToZoom: Subject<any[]> = new Subject<any[]>();

  mapCalled: Subject<boolean> = new Subject<boolean>();
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

  mapInteractionStatus: Subject<boolean> = new Subject<boolean>();

  constructor(
  ) { }

  setMapEvent(event: string): void {
    this.setmapEvent.next(event);
  }

  unsetMapEvent(event: string): void {
    this.unsetmapEvent.next(event);
  }

  getMap(): void {
    this.mapCalled.next(true);
  }

  resetMapView(): void {
    // TODO add argument to control it
    this.isMapViewReset.next(true)
  }

  removeLayerByName(layerName: string): void {
    this.layerNameToRemove.next(layerName)
  }

  sendMap(map: Map): void {
    this.map.next(map);
  }

  setMapInteraction(enabled: boolean): void {
    this.interactionsEnabled.next(enabled);
  }

  setControlToMap(controlName: string): void {
    this.setMapControl.next(controlName);
  }
  unsetControlToMap(controlName: string): void {
    this.unsetMapControl.next(controlName);
  }


  sendScreenMapBounds(coordsBound: number[]): void {
    this.screenMapBound.next(coordsBound);
  }

  zoomToLayerName(layerName: string, zoom: number): void {
    this.layerNameToZoom.next([layerName, zoom]);
  }

  zoomToExtent(extent: Extent, zoom: number): void {
    this.extentToZoom.next([extent, zoom]);
  }

  buildMapScaleDiv(): void {
    this.setMapScaleDiv.next(true);
  }

  removeMapScale(): void {
    this.rmvMapScale.next(true);
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

  mapInteraction(status: boolean): void {
    this.mapInteractionStatus.next(status);
  }

}


