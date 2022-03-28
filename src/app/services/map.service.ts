import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { apiUrl } from '@core/inputs';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapContainer: Subject<any> = new Subject<any>();

  private apiUrlActivitiesGeoData = apiUrl + 'activities_geodata';
  ErrorapiUrlActivitiesGeoDataApiFound: Subject<string> = new Subject<string>();
  activitiesGeoData: Subject<any> = new Subject<any>();

  activitiesGeoDataToMap: Subject<any[]> = new Subject<any[]>();
  tripsGeoDataToMap: Subject<any[]> = new Subject<any[]>();

  mapContainerCalled: Subject<boolean> = new Subject<boolean>();
  isMapViewReset: Subject<boolean> = new Subject<boolean>();

  newPointsSvgLayerName: Subject<string> = new Subject<string>();
  removePointsSvgLayerName: Subject<string> = new Subject<string>();

  newLinesSvgLayerName: Subject<string> = new Subject<string>();
  removeLinesSvgLayerName: Subject<string> = new Subject<string>();

  newCoords: Subject<number[]> = new Subject<number[]>();

  constructor(
    private http: HttpClient
  ) { }

  getMapContainer(): void {
    this.mapContainerCalled.next(true);
  }

  resetMapView(): void {
    this.isMapViewReset.next(true)
  }

  sendMapContainer(mapContainer: any): void {
    this.mapContainer.next(mapContainer);
  }

  pullActivitiesGeoData(): void {

    this.http.get<any>(this.apiUrlActivitiesGeoData).subscribe({
      complete: () => {
      },
      error: error => {
      // TODO improve error message, but API need improvments
      this.ErrorapiUrlActivitiesGeoDataApiFound.next(error.error.message);
      },
      next: response => {
        this.activitiesGeoData.next(response);
      },
    });
  }

  pullActivitiesGeoDataToMap(dataToMap: any[]): void {
    this.activitiesGeoDataToMap.next(dataToMap);
  }

  pullTripsGeoDataToMap(dataToMap: any[]): void {
    this.tripsGeoDataToMap.next(dataToMap);
  }

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

  pullMapCoords(coordinates: any): void {
    this.newCoords.next(coordinates);

  }

}
