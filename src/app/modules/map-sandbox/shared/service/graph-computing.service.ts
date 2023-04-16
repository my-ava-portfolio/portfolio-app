import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiBaseUrl } from '@core/global-values/svr-url';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphComputingService {

  ErrorApiFound: Subject<string> = new Subject<string>();

  apiUrl = apiBaseUrl + 'api/v1/network-api/';

  private shortestPathRoute = this.apiUrl + 'path/shortest';
  shortestPathDataSubject: Subject<number[][]> = new Subject<number[][]>();

  constructor(
    private http: HttpClient,
  ) { }

  getShortestPathFromApi(stepsPoint: string[], mode: 'vehicle' | 'pedestrian' = 'vehicle'): any {
    // wkts as steps_point
    return this.http.get<any>(
      this.shortestPathRoute, {params: {mode: 'vehicle', step_point: stepsPoint}}
    )
  }
}
