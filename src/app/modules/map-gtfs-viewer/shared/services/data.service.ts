import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { environment } from '@root/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  cache = Observable<any>
  private gtfsViewerApiUrl = environment.gtfsViewerApiUrl;

  mapContainer: Subject<any> = new Subject<any>();
  screenMapBound: Subject<number[]> = new Subject<number[]>();
  availableAreas: Subject<string[]> = new Subject<string[]>();
  availableRouteTypes: Subject<string[]> = new Subject<string[]>();
  routeLongName: Subject<string> = new Subject<string>();

  ErrorapiUrlDataApiFound: Subject<string> = new Subject<string>();
  GeoData: Subject<any> = new Subject<any>();
  rangeDateData: Subject<any> = new Subject<any>();

  GeoDataToMap: Subject<any[]> = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

  pullGeoData(area: string, current_date: Date, bounds: number[]): void {
    const currentDate = Math.floor(current_date.getTime() / 1000)

    this.http.get<any>(this.gtfsViewerApiUrl + area.toLowerCase() + '/moving_nodes?date=' + currentDate + "&bounds=" + bounds).subscribe({
      complete: () => {
      },
      error: error => {
      // TODO improve error message, but API need improvments
      this.ErrorapiUrlDataApiFound.next(error.error.message);
      },
      next: response => {
        this.GeoData.next(response);
      },
    });
  }

  pullRangeDateData(currentData: string): void {
    this.http.get<any>(this.gtfsViewerApiUrl + currentData.toLowerCase() + '/range_dates').subscribe({
      complete: () => {
      },
      error: error => {
      // TODO improve error message, but API need improvments
      this.ErrorapiUrlDataApiFound.next(error.error.message);
      },
      next: response => {
        this.rangeDateData.next(response);
      },
    });
  }

  pullAvailableAreas(): void {
    this.http.get<any>(this.gtfsViewerApiUrl + 'existing_study_areas').subscribe({
      complete: () => {
      },
      error: error => {
      // TODO improve error message, but API need improvments
      this.ErrorapiUrlDataApiFound.next(error.error.message);
      },
      next: response => {
        this.availableAreas.next(response);
      },
    });
  }

  pullAvailableRouteTypes(currentData: string): void {
    // HERE ADD CURRENT DATE ARG LINKED TO THE timeline !!!!
    this.http.get<any>(this.gtfsViewerApiUrl + currentData.toLowerCase() + '/route_types').subscribe({
      complete: () => {
      },
      error: error => {
      // TODO improve error message, but API need improvments
      this.ErrorapiUrlDataApiFound.next(error.error.message);
      },
      next: response => {
        this.availableRouteTypes.next(response);
      },
    });
  }

  pullRouteLongName(currentData: string, routeId: string): void {
    this.http.get<any>(this.gtfsViewerApiUrl + currentData.toLowerCase() + '/route_long_name?id=' + routeId).subscribe({
      complete: () => {
      },
      error: error => {
      // TODO improve error message, but API need improvments
      this.ErrorapiUrlDataApiFound.next(error.error.message);
      },
      next: response => {
        this.routeLongName.next(response);
      },
    });
  }

  pullGeoDataToMap(dataToMap: any[]): void {
    this.GeoDataToMap.next(dataToMap);
  }

}
