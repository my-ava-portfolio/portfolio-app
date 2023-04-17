import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiBaseUrl } from '@core/global-values/svr-url';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphComputingService {

  apiUrl = apiBaseUrl + 'api/v1/network-api/';

  private shortestPathRoute = this.apiUrl + 'path/shortest';

  constructor(
    private http: HttpClient,
  ) { }

  getShortestPathFromApi(stepsPoint: string[], mode: 'vehicle' | 'pedestrian' = 'vehicle'): any {
    // wkts as steps_point
    return this.http.get<any>(
      this.shortestPathRoute, {params: {mode: mode, step_point: stepsPoint}}
    )
  }
}
