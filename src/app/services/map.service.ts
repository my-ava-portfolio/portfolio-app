import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapContainer: Subject<any> = new Subject<any>();

  constructor() { }


  sendMapContainer(mapContainer: any): void {
    this.mapContainer.next(mapContainer);
  }

}
