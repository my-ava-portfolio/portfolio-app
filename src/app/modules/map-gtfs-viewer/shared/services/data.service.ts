import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { apiBaseUrl } from '@core/constants';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = apiBaseUrl + 'api/v1/gtfs_builder/';

  mapContainer: Subject<any> = new Subject<any>();
  screenMapBound: Subject<number[]> = new Subject<number[]>();
  availableAreas: Subject<string[]> = new Subject<string[]>();

  ErrorapiUrlDataApiFound: Subject<string> = new Subject<string>();
  GeoData: Subject<any> = new Subject<any>();
  rangeDateData: Subject<any> = new Subject<any>();

  GeoDataToMap: Subject<any[]> = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }



  pullGeoData(area: string, current_date: string, bounds: number[]): void {
    this.http.get<any>(this.apiUrl + area.toLowerCase() + '/moving_nodes_by_date?current_date=' + current_date + "&bounds=" + bounds).subscribe({
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
    // HERE ADD CURRENT DATE ARG LINKED TO THE timeline !!!!
    this.http.get<any>(this.apiUrl + currentData.toLowerCase() + '/range_dates').subscribe({
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
    // HERE ADD CURRENT DATE ARG LINKED TO THE timeline !!!!
    this.http.get<any>(this.apiUrl + '/existing_study_areas').subscribe({
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

  pullGeoDataToMap(dataToMap: any[]): void {
    this.GeoDataToMap.next(dataToMap);
  }

}
