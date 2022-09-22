import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '@core/global-values/main';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrlActivitiesGeoData = apiUrl + 'activities_geodata';
  ErrorapiUrlActivitiesGeoDataApiFound: Subject<string> = new Subject<string>();
  activitiesGeoData: Subject<any> = new Subject<any>();

  dataToMap: Subject<any[]> = new Subject<any[]>();
  dateNotified: Subject<string> = new Subject<string>();
  timelineBuild: Subject<any> = new Subject<any>();

  activitiesGeoDataToMap: Subject<any[]> = new Subject<any[]>();
  tripsGeoDataToMap: Subject<any[]> = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }


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

  pullDataToMap(dataToMap: any): void {
    // NOT USED (TODO must be a generic func)
    this.dataToMap.next(dataToMap);
  }

  pullActivitiesGeoDataToMap(dataToMap: any[]): void {
    this.activitiesGeoDataToMap.next(dataToMap);
  }

  pullTripsGeoDataToMap(dataToMap: any[]): void {
    this.tripsGeoDataToMap.next(dataToMap);
  }

}
