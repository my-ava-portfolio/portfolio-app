import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '@core/global-values/main';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrlActivitiesGeoData = apiUrl + 'geodata/activities';
  errorapiUrlApiFound: Subject<string> = new Subject<string>();
  activitiesGeoData: Subject<any> = new Subject<any>();

  private apiUrlTripsGeoData = apiUrl + '/geodata/trips';
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

  queryTripsGeoData(parameters: any): void {

    this.http.get<any>(this.apiUrlTripsGeoData, { params: parameters }).subscribe({
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
