import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@root/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphComputingService {

  private networkApiUrl = environment.networkApiUrl;

  private shortestPathRoute = this.networkApiUrl + 'path/shortest';

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
