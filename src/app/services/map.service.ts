import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { apiBaseUrl } from '../core/inputs';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapContainer: Subject<any> = new Subject<any>();

  private apiUrlActivitiesGeoData = apiBaseUrl + 'activities_geodata?currentDate=';
  ErrorapiUrlActivitiesGeoDataApiFound: Subject<string> = new Subject<string>();
  activitiesGeoData: Subject<any> = new Subject<any>();

  activitiesGeoDataToMap: Subject<any[]> = new Subject<any[]>();

  isMapContainerCalled: Subject<boolean> = new Subject<boolean>();
  isMapViewReset: Subject<boolean> = new Subject<boolean>();


  constructor(
    private http: HttpClient
  ) { }

  getMapContainer(): void {
    this.isMapContainerCalled.next(true);
  }

  resetMapView(): void {
    this.isMapViewReset.next(true)
  }

  sendMapContainer(mapContainer: any): void {
    this.mapContainer.next(mapContainer);
  }

  pullActivitiesGeoData(currentDate: string | null): void {

    this.http.get<any>(this.apiUrlActivitiesGeoData + currentDate).subscribe(
      (response) => {
        this.activitiesGeoData.next(response);
      },
      (response) => {
        // TODO improve error message, but API need improvments
        this.ErrorapiUrlActivitiesGeoDataApiFound.next(response.error.message);
      }
    );
  }

  pullActivitiesGeoDataToMap(dataToMap: any[]): void {
    this.activitiesGeoDataToMap.next(dataToMap);
  }


}
