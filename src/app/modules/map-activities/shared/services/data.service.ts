import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private portfolioApiUrl = environment.resumeApiUrl

  private apiUrlActivitiesGeoData = this.portfolioApiUrl + 'geodata/activities';
  errorapiUrlApiFound: Subject<string> = new Subject<string>();
  activitiesGeoData: Subject<any> = new Subject<any>();

  private apiUrlTripsGeoData = this.portfolioApiUrl + '/geodata/trips';
  tripsGeoData: Subject<any> = new Subject<any>();

  dateNotified: Subject<string> = new Subject<string>();
  timelineBuild: Subject<any> = new Subject<any>();

  activitiesGeoDataToMap: Subject<any[]> = new Subject<any[]>();
  tripsGeoDataToMap: Subject<any[]> = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }


  queryActivitiesGeoData(): void {

    this.http.get<any>(this.apiUrlActivitiesGeoData).subscribe({
      complete: () => {
      },
      error: error => {
      // TODO improve error message, but API need improvments
      this.errorapiUrlApiFound.next(error.error.message);
      },
      next: response => {
        this.activitiesGeoData.next(response);
      },
    });
  }

  pullActivitiesGeoDataToMap(dataToMap: any[]): void {
    this.activitiesGeoDataToMap.next(dataToMap);
  }

  queryTripsGeoData(): void {

    this.http.get<any>(this.apiUrlTripsGeoData).subscribe({
      complete: () => {
      },
      error: error => {
      // TODO improve error message, but API need improvments
      this.errorapiUrlApiFound.next(error.error.message);
      },
      next: response => {
        this.tripsGeoData.next(response);
      },
    });
  }

  pullTripsGeoDataToMap(dataToMap: any[]): void {
    this.tripsGeoDataToMap.next(dataToMap);
  }

}
